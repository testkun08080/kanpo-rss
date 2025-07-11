"""
RSSフィードを生成するスクリプト
このスクリプトは、官報のPDF情報を受け取り、RSSフィードを生成します。
引数としてPDF情報のリストをJSON形式で受け取ります。
生成されたRSSフィードは、`feed.xml`というファイルに保存されます。
"""

import ast
import sys
import json
from datetime import datetime, timezone
import logging

import re
import requests
from dateutil import parser as date_parser


def shorten_url(url):
    """短縮URL作成

    Args:
        url (str): URL文字列

    Returns:
        str: 短縮された文字列
    """
    try:
        response = requests.get("http://tinyurl.com/api-create.php", params={"url": url}, timeout=5)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"❌ URL短縮に失敗: {e}")
        return url  # 元のURLを返す


def clean_title_string(title):
    """万が一、ページタイトルに余分な空白などが入っていた場合に備えて、文字列を綺麗にします

    Args:
        title (str): タイトル名

    Returns:
        str: 空白や括弧を排除した文字列
    """
    temp = re.sub(r"\s+|[\u200b]", "", title)  # 空白文字とゼロ幅スペースを除去
    temp = temp.replace("(", "").replace(")", "")  # 丸括弧を削除
    return temp


def make_item(pdf_info):
    """PDF情報からRSSアイテムを生成し、JSONファイルに保存する関数

    Args:
        pdf_info (dict): 辞書型のPDF情報。辞書型で、以下のキーを含む必要があります。
            - "name": PDFの名前
            - "url": PDFのURL
    """

    title = pdf_info["name"]
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S GMT")

    short_url = shorten_url(pdf_info["url"])
    logo_icon = "https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/images/logo.png"

    new_item = {
        "title": title,
        "link": pdf_info["url"],
        "pub_date": date,
        "author": "https://www.kanpo.go.jp",
        "description": f"{title}が発行されました。\nリンクはこちら:{short_url}",
        "logo_icon": logo_icon,
    }

    json_path = "rss_data.json"

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    # 既存の同一リンクのアイテムを探す
    existing_item = next((item for item in data if item["link"] == new_item["link"]), None)

    if existing_item:
        # pub_date を比較し、新しければ上書き
        existing_date = date_parser.parse(existing_item.get("pub_date", "1970-01-01"))
        new_date = date_parser.parse(new_item["pub_date"])

        if new_date > existing_date:
            data.remove(existing_item)
            data.append(new_item)
            logging.info(f"🆕 更新されたRSSアイテムを上書きしました: {new_item['title']}")
        else:
            logging.info(f"⏸ 既存のRSSアイテムの方が新しいか同じためスキップ: {new_item['title']}")
    else:
        # なければ追加
        data.append(new_item)
        logging.info(f"➕ 新しいRSSアイテムを追加しました: {new_item['title']}")

    # if not any(item["link"] == new_item["link"] for item in data):
    #     data.append(new_item)

    data = sorted(data, key=lambda x: x["pub_date"], reverse=True)

    item_template = """
    <item>
    <title><![CDATA[{title}]]></title>
    <description><![CDATA[{description}]]></description>
    <link>{link}</link>
    <guid isPermaLink="true">{link}</guid>
    <pubDate>{pub_date}</pubDate>
    <dc:creator>{author}</dc:creator>
    <enclosure url="{logo_icon}" length="0" type="image/png"/>
    </item>
    """

    items_xml = ""
    for item in data:
        items_xml += item_template.format(**item)

    rss_template = f"""<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:atom="http://www.w3.org/2005/Atom">

    <channel>
    <title><![CDATA[ 官報RSS(非公式)フィード ]]></title>
    <link>https://www.kanpo.go.jp</link>
    <description>これは官報の非公式更新通知RSSです。基本的に毎日8:35分ごろに更新内容を確認して、RSSをプッシュします/</description>
    <generator>testkun08080</generator>
    <lastBuildDate>{date}</lastBuildDate>
    <atom:link href="https://testkun08080.github.io/action-kanpo/feed.xml" rel="self" type="application/rss+xml"/>
    <language>ja</language>
    <image>
        <url>{logo_icon}</url>
        <title><![CDATA[ 官報RSS(非公式)フィード ]]></title>
        <link>https://www.kanpo.go.jp</link>
    </image>
    {items_xml}
    </channel>
    </rss>
    """

    # フィード用ファイルへ書き込み
    with open("feed.xml", "w", encoding="utf-8") as f:
        f.write(rss_template)

    # 記録用jsonファイルへ書き込み
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        logging.error("引数が不足しています。")
        logging.error("PDF情報を載せたリストを引数として第一引数に必要があります")
        sys.exit(1)

    try:
        pdf_list = ast.literal_eval(sys.argv[1])  # 文字列をリストに変換

    except (ValueError, SyntaxError):
        logging.error("引数が読み込めませんでした。")
        sys.exit(1)

    for pdf_info in pdf_list:
        make_item(pdf_info)

    logging.info("RSSフィードが更新されました")
