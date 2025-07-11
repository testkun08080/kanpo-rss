"""
RSSフィードを生成するスクリプト(目次リンクごと)
このスクリプトは、官報の目次リンクを受け取り、RSSフィードを生成します。
引数として目次のリンクがまとめられたJSON形式で受け取ります。
生成されたRSSフィードは、`feed_toc.xml`というファイルに保存されます。
"""

import ast
import sys
import json
from datetime import datetime, timezone
import logging

from dateutil import parser as date_parser


def make_item(page_title, toc_info):
    """PDF情報からRSSアイテムを生成し、JSONファイルに保存する関数

    Args:
        page_title (str): ページタイトル名
        toc_infos (dict): 辞書型で、以下のキーを含む必要があります。
            - "link_title": '入札公告'
            - "url": '目次に該当するページのurl'}
    """

    date = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S GMT")

    # short_url = shorten_url(pdf_info["url"])
    link_url = toc_info["url"]
    toc_title = toc_info["link_title"]
    logo_icon = "https://raw.githubusercontent.com/testkun08080/kanpo-rss/refs/heads/main/images/logo.png"

    new_item = {
        "title": toc_title,
        "link": link_url,
        "pub_date": date,
        "author": "https://www.kanpo.go.jp",
        "description": f"{page_title}が発行されました。\n{toc_title}についてはこちら:{link_url}",
        "logo_icon": logo_icon,
    }

    json_path = "rss_toc_data.json"

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

    # data = sorted(data, key=lambda x: x["pub_date"], reverse=True)

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
    <title><![CDATA[ 官報RSS目次別(非公式)フィード ]]></title>
    <link>https://www.kanpo.go.jp</link>
    <description>これは官報の非公式更新通知RSS（目次別）です。基本的に毎日8:35分ごろに更新内容を確認して、RSSをプッシュします/</description>
    <generator>testkun08080</generator>
    <lastBuildDate>{date}</lastBuildDate>
    <atom:link href="https://testkun08080.github.io/action-kanpo/feed_toc.xml" rel="self" type="application/rss+xml"/>
    <language>ja</language>
    <image>
        <url>{logo_icon}</url>
        <title><![CDATA[ 官報RSS目次別(非公式)フィード ]]></title>
        <link>https://www.kanpo.go.jp</link>
    </image>
    {items_xml}
    </channel>
    </rss>
    """

    # フィード用ファイルへ書き込み
    with open("feed_details.xml", "w", encoding="utf-8") as f:
        f.write(rss_template)

    # 記録用jsonファイルへ書き込み
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        logging.error("引数が不足しています。")
        logging.error("目次情報をまとめたリストを引数としてわたす必要があります")
        sys.exit(1)

    try:
        toc_list = ast.literal_eval(sys.argv[2])  # 文字列をリストに変換

    except (ValueError, SyntaxError):
        logging.error("引数が読み込めませんでした。")
        sys.exit(1)

    for item in toc_list:
        page_title = item["page_title"]
        toc_infos = item["toc_infos"]
        for infos in toc_infos:
            for toc_item in infos:
                converted = toc_item["value"]
                if isinstance(converted, dict) and converted:
                    make_item(page_title, converted)
                elif isinstance(converted, list) and converted:
                    for converted_item in converted:
                        make_item(page_title, converted_item)

    logging.info("RSSフィードが更新されました")
