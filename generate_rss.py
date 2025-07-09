"""
RSSフィードを生成するスクリプト
このスクリプトは、官報のPDF情報を受け取り、RSSフィードを生成します。
引数としてPDF情報のリストをJSON形式で受け取ります。
生成されたRSSフィードは、`feed.xml`というファイルに保存されます。
"""

import sys
import json
from datetime import datetime, timezone


def make_item(pdf_info):
    """PDF情報からRSSアイテムを生成し、JSONファイルに保存する関数

    Args:
        pdf_info (list): リスト型のPDF情報。各要素は辞書型で、以下のキーを含む必要があります。
            - "name": PDFの名前
            - "url": PDFのURL
            - "description": 官報の説明（オプション）
    """

    date = datetime.now(timezone.utc).strftime("%Y-%m-%d-%H:%M:%S")
    new_item = {
        "title": pdf_info["name"],
        "link": pdf_info["url"],
        "pub_date": date,
        "author": "https://www.kanpo.go.jp",
        "description": pdf_info.get("description", "官報が公開されました"),
    }

    json_path = "rss_data.json"

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    if not any(item["link"] == new_item["link"] for item in data):
        data.append(new_item)

    data = sorted(data, key=lambda x: x["pub_date"], reverse=True)

    item_template = """
    <item>
    <title><![CDATA[{title}]]></title>
    <description><![CDATA[{description}]]></description>
    <link>{link}</link>
    <guid isPermaLink="true">{link}</guid>
    <pubDate>{pub_date}</pubDate>
    <dc:creator>{author}</dc:creator>
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
    <title><![CDATA[ 官報RSSフィード ]]></title>
    <link>https://www.kanpo.go.jp</link>
    <description>これは官報の非公式更新通知RSSです。基本的に毎日8:45分ごろに更新内容を確認して、RSSをプッシュします/</description>
    <generator>testkun08080</generator>
    <lastBuildDate>{date}</lastBuildDate>
    <atom:link href="https://testkun08080.github.io/action-kanpo/feed.xml" rel="self" type="application/rss+xml"/>
    <language>ja</language>
    <image>
        <url>https://upload.wikimedia.org/wikipedia/commons/8/80/GoJ_logo.png</url>
        <title><![CDATA[ 官報RSSフィード ]]></title>
        <link>https://www.kanpo.go.jp</link>
    </image>
    {items_xml}
    </channel>
    </rss>
    """

    with open("feed.xml", "w", encoding="utf-8") as f:
        f.write(rss_template)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        print("引数が不足しています。")
        sys.exit(1)

    try:
        pdf_list = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        print("引数が読み込めませんでした。")
        sys.exit(1)

    for pdf_info in pdf_list:
        make_item(pdf_info)

    print("RSSフィードが更新されました")
