window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>钓点宝 · 纯野钓社区</title>
    <!-- ===== 高德地图 JS API (已植入你的 Key) ===== -->
    <script src="https://webapi.amap.com/maps?v=2.0&key=c1870b4cfdaa84e8e076eb4ecf3c5415&plugin=AMap.Geocoder"></script>
    <style>
        /* ===== 全局重置 ===== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
        }
        :root {
            --primary: #2d5a27;
            --primary-light: #4a7c44;
            --primary-bg: #eaf3e8;
            --gold: #d4a343;
            --warn: #c0392b;
            --gray: #6b7280;
            --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
            --tab-height: 68px;
        }
        body {
            background: #f2f6ef;
            padding-bottom: calc(var(--tab-height) + 20px);
            color: #1f2a1f;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--primary-light); border-radius: 4px; }

        /* ===== 顶部 ===== */
        .header {
            background: linear-gradient(135deg, #1a3a17, var(--primary));
            color: white;
            padding: 14px 20px 12px;
            position: sticky;
            top: 0;
            z-index: 20;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 480px;
            margin: 0 auto;
        }
        .header h1 {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .header h1 small {
            font-size: 11px;
            font-weight: 400;
            opacity: 0.8;
            background: rgba(255, 255, 255, 0.15);
            padding: 1px 10px;
            border-radius: 30px;
            margin-left: 6px;
        }
        .header-actions {
            display: flex;
            gap: 16px;
            font-size: 18px;
        }
        .header-actions span {
            cursor: pointer;
            opacity: 0.9;
        }

        /* ===== 公告 ===== */
        .notice-bar {
            background: #fff8e7;
            border-bottom: 1px solid #f0e4cc;
            padding: 8px 16px;
            font-size: 12px;
            color: #7a681a;
            display: flex;
            align-items: center;
            gap: 8px;
            overflow: hidden;
            white-space: nowrap;
            max-width: 480px;
            margin: 0 auto;
        }
        .notice-bar .badge {
            background: var(--warn);
            color: white;
            padding: 1px 10px;
            border-radius: 30px;
            font-size: 10px;
            font-weight: 700;
            flex-shrink: 0;
        }
        .notice-bar .text {
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* ===== 容器 & 页面 ===== */
        .container {
            max-width: 480px;
            margin: 0 auto;
            padding: 12px 16px 20px;
        }
        .page {
            display: none;
            animation: fadeUp 0.25s ease;
        }
        .page.active { display: block; }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ===== 底部导航 ===== */
        .tab-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            right: 0;
            background: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: var(--tab-height);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
            border-top: 1px solid #eef2ee;
            z-index: 30;
            padding-bottom: env(safe-area-inset-bottom);
        }
        .tab-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 10px;
            color: var(--gray);
            cursor: pointer;
            transition: 0.2s;
            padding: 4px 12px;
            border: none;
            background: none;
            position: relative;
        }
        .tab-item .tab-icon { font-size: 22px; line-height: 1.2; }
        .tab-item.active {
            color: var(--primary);
            font-weight: 600;
        }
        .tab-item.active .tab-icon { transform: scale(1.05); }
        .tab-center {
            background: var(--primary);
            color: white !important;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            justify-content: center;
            margin-top: -20px;
            box-shadow: 0 4px 16px rgba(45, 90, 39, 0.4);
        }
        .tab-center .tab-icon { font-size: 28px; color: white; }
        .tab-center.active { background: var(--primary-light); }
        .tab-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: var(--warn);
            color: white;
            font-size: 9px;
            padding: 1px 6px;
            border-radius: 30px;
            min-width: 18px;
            text-align: center;
        }

        /* ===== 地图容器 ===== */
        #mapContainer {
            width: 100%;
            height: 70vh;
            border-radius: 20px;
            overflow: hidden;
            margin-top: 12px;
            box-shadow: var(--card-shadow);
        }

        /* ===== 其他通用样式 ===== */
        .category-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 16px 0 20px;
        }
        .category-item {
            background: white;
            border-radius: 16px;
            padding: 12px 4px;
            text-align: center;
            box-shadow: var(--card-shadow);
            cursor: pointer;
            transition: 0.15s;
            border: 1px solid transparent;
        }
        .category-item:active {
            transform: scale(0.95);
            border-color: var(--primary);
        }
        .category-item .cat-icon { font-size: 24px; display: block; margin-bottom: 2px; }
        .category-item .cat-name { font-size: 11px; color: #1f2a1f; font-weight: 500; }

        .feed-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .post-card {
            background: white;
            border-radius: 20px;
            padding: 16px;
            box-shadow: var(--card-shadow);
            border: 1px solid rgba(0, 0, 0, 0.03);
            transition: 0.15s;
            cursor: pointer;
        }
        .post-card:active { transform: scale(0.99); }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
        }
        .card-title { font-size: 17px; font-weight: 700; color: #1a2e1a; }
        .card-tags {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
            margin: 4px 0 6px;
        }
        .tag {
            font-size: 10px;
            padding: 2px 10px;
            border-radius: 30px;
            background: var(--primary-bg);
            color: var(--primary);
            font-weight: 500;
        }
        .tag.free { background: #e6f7e6; color: #1e7a1e; }
        .tag.warn { background: #fde8e8; color: var(--warn); }
        .tag.gold { background: #fdf4e0; color: #a67c1e; }
        .card-desc {
            font-size: 14px;
            color: #3d4a3d;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 4px 0 8px;
        }
        .card-media {
            display: flex;
            gap: 6px;
            margin: 8px 0;
            flex-wrap: wrap;
        }
        .card-media img {
            width: calc(33.33% - 4px);
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 12px;
            background: #e8ede8;
        }
        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f0f4f0;
            font-size: 13px;
            color: var(--gray);
        }
        .card-footer .actions {
            display: flex;
            gap: 16px;
        }
        .card-footer .actions span {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .card-footer .actions span:active { opacity: 0.6; }

        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; font-size: 14px; font-weight: 600; color: #1a2e1a; margin-bottom: 4px; }
        .form-group label .required { color: var(--warn); margin-left: 2px; }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 12px 14px;
            border: 1.5px solid #dce4dc;
            border-radius: 14px;
            font-size: 15px;
            background: white;
            transition: 0.2s;
            outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.1);
        }
        .form-group textarea { height: 80px; resize: vertical; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .upload-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 6px;
        }
        .upload-box {
            width: 80px;
            height: 80px;
            border-radius: 14px;
            background: #f0f5f0;
            border: 1.5px dashed #bccbb8;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: #8a9e8a;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .upload-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
        }
        .upload-box input[type="file"] {
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            position: relative;
            z-index: 2;
        }
        .btn-submit {
            width: 100%;
            padding: 16px;
            background: var(--primary);
            border: none;
            border-radius: 16px;
            color: white;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s;
            box-shadow: 0 6px 20px rgba(45, 90, 39, 0.3);
        }
        .btn-submit:active { transform: scale(0.97); }

        .tool-card {
            background: white;
            border-radius: 16px;
            padding: 18px;
            margin-bottom: 14px;
            box-shadow: var(--card-shadow);
        }
        .tool-card .tool-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        .weather-score {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 0;
        }
        .weather-score .score-num {
            font-size: 36px;
            font-weight: 800;
            color: var(--gold);
        }
        .weather-score .score-desc { font-size: 14px; color: #3d4a3d; }
        .record-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f4f0;
            font-size: 14px;
        }
        .record-item:last-child { border-bottom: none; }

        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 100;
            align-items: flex-end;
            justify-content: center;
        }
        .modal-overlay.active { display: flex; }
        .modal-content {
            background: white;
            width: 100%;
            max-width: 480px;
            max-height: 90vh;
            border-radius: 28px 28px 0 0;
            padding: 24px 20px 30px;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
            from { transform: translateY(60px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .modal-handle {
            width: 40px;
            height: 4px;
            background: #d1d9d1;
            border-radius: 4px;
            margin: 0 auto 16px;
        }
        .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .modal-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 8px 0 12px;
        }
        .modal-body {
            font-size: 15px;
            line-height: 1.7;
            color: #2d3a2d;
        }
        .modal-body .section-title {
            font-weight: 700;
            color: var(--primary);
            margin: 16px 0 6px;
            font-size: 16px;
            border-left: 4px solid var(--gold);
            padding-left: 10px;
        }
        .modal-close {
            width: 100%;
            padding: 14px;
            background: #f0f4f0;
            border: none;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 600;
            color: #3d4a3d;
            margin-top: 16px;
            cursor: pointer;
        }

        /* 导航选择弹窗 */
        #navModal { z-index: 200; align-items: center; }
        #navModal .modal-content {
            border-radius: 28px;
            max-width: 360px;
            text-align: center;
            padding: 30px 24px 24px;
        }
        #navModal .modal-content .nav-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 18px;
            color: #1a2e1a;
        }
        #navModal .modal-content .nav-btn {
            display: block;
            width: 100%;
            padding: 14px;
            margin-bottom: 12px;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.15s;
            color: white;
        }
        #navModal .modal-content .nav-btn:active { transform: scale(0.96); }
        .nav-btn.baidu { background: #3385ff; }
        .nav-btn.amap { background: #00b4ff; }
        .nav-btn.cancel { background: #f0f4f0; color: #3d4a3d; }

        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .mt-8 { margin-top: 8px; }
        .mb-8 { margin-bottom: 8px; }
        .text-center { text-align: center; }
        .text-muted { color: var(--gray); font-size: 13px; }
        .hidden { display: none !important; }
        .gap-4 { gap: 4px; }

        .empty-state {
            text-align: center;
            padding: 48px 20px;
            color: var(--gray);
        }
        .empty-state .icon {
            font-size: 48px;
            display: block;
            margin-bottom: 12px;
        }
        .amap-info-content .nav-link {
            display: inline-block;
            margin-top: 6px;
            padding: 4px 12px;
            background: var(--primary);
            color: white;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
        }
        .amap-info-content .nav-link:active { opacity: 0.7; }
    </style>
</head>
<body>

    <!-- ===== 顶部 ===== -->
    <div class="header">
        <div class="header-content">
            <h1>🎣 钓点宝 <small>纯野钓</small></h1>
            <div class="header-actions">
                <span onclick="switchPage('tools')">🔍</span>
                <span onclick="alert('生态垂钓 · 留大放小 · 带走垃圾')">🌿</span>
            </div>
        </div>
    </div>

    <!-- ===== 公告 ===== -->
    <div class="notice-bar" id="noticeBar">
        <span class="badge">📢 公告</span>
        <span class="text" id="noticeText">🚫 禁渔期：6-8月长江流域部分干流禁钓 · 请遵守当地法规</span>
    </div>

    <!-- ===== 主容器 ===== -->
    <div class="container">

        <!-- ========== 首页 ========== -->
        <div class="page active" id="page-home">
            <div class="category-grid">
                <div class="category-item" onclick="filterByType('江河')"><span class="cat-icon">🌊</span><span class="cat-name">江河</span></div>
                <div class="category-item" onclick="filterByType('水库')"><span class="cat-icon">🏞️</span><span class="cat-name">水库</span></div>
                <div class="category-item" onclick="filterByType('溪流')"><span class="cat-icon">💧</span><span class="cat-name">溪流</span></div>
                <div class="category-item" onclick="filterByType('浅滩')"><span class="cat-icon">🏖️</span><span class="cat-name">浅滩</span></div>
                <div class="category-item" onclick="filterByType('路亚')"><span class="cat-icon">🎯</span><span class="cat-name">路亚</span></div>
                <div class="category-item" onclick="filterByType('深山')"><span class="cat-icon">⛰️</span><span class="cat-name">深山徒步</span></div>
                <div class="category-item" onclick="filterByType('冷门')"><span class="cat-icon">🌿</span><span class="cat-name">冷门无人</span></div>
                <div class="category-item" onclick="filterByType('避雷')"><span class="cat-icon">⚠️</span><span class="cat-name">避雷专区</span></div>
            </div>
            <div class="feed-list" id="feedList"></div>
        </div>

        <!-- ========== 地图页面 ========== -->
        <div class="page" id="page-map">
            <h2 style="margin-bottom:12px;font-size:20px;">🗺️ 野钓点地图</h2>
            <div id="mapContainer"></div>
            <div style="margin-top:12px;font-size:12px;color:var(--gray);text-align:center;">点击标记查看详情 · 信息窗内可导航</div>
        </div>

        <!-- ========== 发布 ========== -->
        <div class="page" id="page-publish">
            <h2 style="margin-bottom:16px;font-size:20px;">📌 发布野钓点位</h2>
            <form id="publishForm" onsubmit="return false;">
                <div class="form-group">
                    <label>钓点名称 <span class="required">*</span></label>
                    <input type="text" id="pTitle" placeholder="例：龙湖水库大坝桦尖" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>水域类型 <span class="required">*</span></label>
                        <select id="pWaterType">
                            <option value="天然河道">天然河道</option>
                            <option value="山体水库">山体水库</option>
                            <option value="山间小溪">山间小溪</option>
                            <option value="通江支流">通江支流</option>
                            <option value="废弃自然塘">废弃自然塘</option>
                            <option value="江滩浅滩">江滩浅滩</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>是否免费 <span class="required">*</span></label>
                        <select id="pIsFree">
                            <option value="免费">✅ 免费野钓</option>
                            <option value="收费">❌ 收费（违规）</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>详细位置 / 路段描述 <span class="required">*</span></label>
                    <input type="text" id="pLocation" placeholder="例：XX省XX市XX县龙湖路尽头右转" required>
                </div>
                <div class="form-group">
                    <label>管制说明</label>
                    <select id="pControl">
                        <option value="无管制，可垂钓">无管制，可垂钓</option>
                        <option value="禁钓区（违规）">禁钓区（违规）</option>
                        <option value="有巡逻，需注意">有巡逻，需注意</option>
                        <option value="饮用水保护区（禁止）">饮用水保护区（禁止）</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>平均水深</label>
                        <input type="text" id="pDepth" placeholder="例：2-4米">
                    </div>
                    <div class="form-group">
                        <label>水底情况</label>
                        <select id="pBottom">
                            <option value="泥底">泥底</option>
                            <option value="沙石底">沙石底</option>
                            <option value="乱石堆（挂底）">乱石堆（挂底）</option>
                            <option value="深浅交界">深浅交界</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>目标野生鱼种（逗号分隔）</label>
                    <input type="text" id="pFish" placeholder="例：鲫鱼,鲤鱼,翘嘴,马口">
                </div>
                <div class="form-group">
                    <label>实战攻略 / 避坑提醒</label>
                    <textarea id="pTips" placeholder="例：建议用谷麦钓法，防走水，注意水底乱石挂底..."></textarea>
                </div>
                <div class="form-group">
                    <label>实拍图片（最多6张）</label>
                    <div class="upload-grid" id="imagePreviewGrid">
                        <div class="upload-box">
                            <span>+</span>
                            <input type="file" accept="image/*" multiple id="imageInput">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn-submit" onclick="handlePublish()">🌿 发布野钓点位</button>
                <div style="margin-top:12px;font-size:12px;color:var(--gray);text-align:center;">⚠️ 严禁发布禁钓区、养殖塘、商业钓场，违规永久封禁</div>
            </form>
        </div>

        <!-- ========== 工具 ========== -->
        <div class="page" id="page-tools">
            <h2 style="margin-bottom:16px;font-size:20px;">🛠️ 野钓实用工具</h2>
            <div class="tool-card">
                <div class="tool-title">☀️ 垂钓天气评分</div>
                <div class="weather-score">
                    <div class="score-num" id="weatherScore">82</div>
                    <div class="score-desc">
                        <div>气压 1012hPa · 温差 6℃</div>
                        <div style="color:var(--primary);font-weight:600;">✅ 溶氧量高，适宜出钓</div>
                    </div>
                </div>
                <button onclick="refreshWeather()" style="padding:6px 20px;border:1px solid var(--primary);border-radius:30px;background:white;color:var(--primary);cursor:pointer;">刷新评分</button>
            </div>
            <div class="tool-card">
                <div class="tool-title">📓 野钓渔获记录本</div>
                <div id="recordList">
                    <div class="record-item flex-between">
                        <span>🐟 龙湖水库 · 鲫鱼 3.2斤</span>
                        <span class="text-muted">2026-06-28</span>
                    </div>
                    <div class="record-item flex-between">
                        <span>🐟 清水河 · 马口 0.5斤</span>
                        <span class="text-muted">2026-06-25</span>
                    </div>
                </div>
                <div style="margin-top:10px;display:flex;gap:10px;">
                    <input type="text" id="recordInput" placeholder="地点+鱼种+重量" style="flex:1;padding:10px 14px;border:1.5px solid #dce4dc;border-radius:30px;outline:none;">
                    <button onclick="addRecord()" style="padding:10px 20px;background:var(--primary);color:white;border:none;border-radius:30px;cursor:pointer;">记录</button>
                </div>
            </div>
            <div class="tool-card">
                <div class="tool-title">👥 同城野钓约伴</div>
                <div style="font-size:14px;color:#3d4a3d;padding:6px 0;">🚗 周六去龙湖夜钓，寻钓友拼车，深山结伴安全。</div>
                <button style="margin-top:8px;padding:8px 24px;background:var(--gold);color:white;border:none;border-radius:30px;cursor:pointer;">发布约伴</button>
            </div>
            <div class="tool-card" style="background:#f8fbf6;border:1px solid #d4e0d4;">
                <div class="tool-title">🌱 生态垂钓科普</div>
                <ul style="font-size:13px;color:#2d3a2d;line-height:2;padding-left:20px;">
                    <li>✅ 留大放小，幼鱼母鱼请放流</li>
                    <li>✅ 带走所有垃圾，不污染河道</li>
                    <li>🚫 禁止电鱼、毒鱼、地笼、锚鱼</li>
                    <li>🚫 禁止在饮用水源保护区垂钓</li>
                </ul>
            </div>
        </div>

        <!-- ========== 我的 ========== -->
        <div class="page" id="page-profile">
            <h2 style="margin-bottom:16px;font-size:20px;">🧑‍🌾 我的野钓</h2>
            <div style="background:white;border-radius:20px;padding:24px;text-align:center;box-shadow:var(--card-shadow);">
                <div style="font-size:48px;">🎣</div>
                <div style="font-weight:700;font-size:18px;margin:8px 0 4px;">野钓探钓者</div>
                <div class="text-muted">已探索 12 个野钓点 · 发布 8 篇</div>
                <div style="display:flex;justify-content:center;gap:30px;margin:16px 0;">
                    <div><span style="font-weight:700;font-size:20px;color:var(--primary);">23</span><br><span class="text-muted">获赞</span></div>
                    <div><span style="font-weight:700;font-size:20px;color:var(--primary);">45</span><br><span class="text-muted">粉丝</span></div>
                </div>
                <button onclick="alert('我的发布列表')" style="padding:10px 30px;background:var(--primary-bg);color:var(--primary);border:1px solid var(--primary);border-radius:30px;cursor:pointer;">查看我的钓点</button>
                <div style="margin-top:16px;font-size:12px;color:var(--gray);border-top:1px solid #f0f4f0;padding-top:16px;">
                    <span onclick="alert('举报违规：电鱼/网工/禁钓区')" style="cursor:pointer;color:var(--warn);">🚨 举报违规</span>
                    <span style="margin:0 10px;">|</span>
                    <span onclick="alert('生态垂钓倡议：留大放小，带走垃圾')" style="cursor:pointer;">🌿 生态倡议</span>
                </div>
            </div>
        </div>

    </div>

    <!-- ===== 底部导航 ===== -->
    <div class="tab-bar">
        <button class="tab-item active" onclick="switchPage('home')">
            <span class="tab-icon">🏠</span><span>首页</span>
        </button>
        <button class="tab-item" onclick="switchPage('map')">
            <span class="tab-icon">🗺️</span><span>地图</span>
        </button>
        <button class="tab-item tab-center" onclick="switchPage('publish')">
            <span class="tab-icon">➕</span>
            <span style="font-size:9px;margin-top:2px;">发布</span>
        </button>
        <button class="tab-item" onclick="switchPage('tools')">
            <span class="tab-icon">🛠️</span><span>工具</span>
        </button>
        <button class="tab-item" onclick="switchPage('profile')">
            <span class="tab-icon">👤</span><span>我的</span>
            <span class="tab-badge">3</span>
        </button>
    </div>

    <!-- ===== 详情弹窗 ===== -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal-content" id="modalContent">
            <div class="modal-handle"></div>
            <div id="modalBody"></div>
            <button class="modal-close" onclick="closeModal()">关闭</button>
        </div>
    </div>

    <!-- ===== 导航选择弹窗 ===== -->
    <div class="modal-overlay" id="navModal">
        <div class="modal-content">
            <div class="nav-title">🗺️ 选择导航地图</div>
            <button class="nav-btn baidu" onclick="openMap('baidu')">🌐 百度地图</button>
            <button class="nav-btn amap" onclick="openMap('amap')">🌐 高德地图</button>
            <button class="nav-btn cancel" onclick="closeNavModal()">取消</button>
        </div>
    </div>

    <script>
        // ============================================================
        //  钓点宝 · 纯野钓社区 - 高德地图集成版（已植入Key）
        // ============================================================

        const STORAGE_KEY = 'diaodianbao_posts';
        let posts = [];
        let currentFilter = '全部';
        let navAddress = '';
        let mapInstance = null;
        let markers = [];
        let geocoder = null;

        // ---------- 加载数据 ----------
        function loadData() {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                try {
                    posts = JSON.parse(raw);
                    posts.forEach(p => {
                        if (!p.comments) p.comments = [];
                        if (!p.likes) p.likes = 0;
                        if (!p.liked) p.liked = false;
                    });
                } catch (e) { posts = []; }
            }
            if (posts.length === 0) {
                posts = [{
                    id: Date.now() - 100000,
                    title: '龙湖水库大坝桦尖',
                    waterType: '山体水库',
                    isFree: '免费',
                    location: '成都市·龙湖路尽头右转300米',
                    control: '无管制，可垂钓',
                    depth: '3-5米',
                    bottom: '乱石堆（挂底）',
                    fish: '鲫鱼,鲤鱼,翘嘴,鳊鱼',
                    tips: '建议用谷麦钓法，防走水，水底乱石多易挂底，建议单钩通线。早口5-8点最佳。',
                    images: [],
                    video: '',
                    likes: 12,
                    liked: false,
                    comments: [
                        { user: '野钓老李', text: '这里鲫鱼确实大，上周我上了条2斤的', time: '2小时前' },
                        { user: '小鱼儿', text: '注意有巡逻，不过一般不管', time: '1小时前' }
                    ],
                    time: '2026-06-27 20:30',
                    author: '探钓达人·老王'
                }, {
                    id: Date.now() - 200000,
                    title: '清水河上游浅滩（路亚天堂）',
                    waterType: '天然河道',
                    isFree: '免费',
                    location: '绵阳市·清水河大桥下游500米',
                    control: '无管制，可垂钓',
                    depth: '0.5-1.5米',
                    bottom: '沙石底',
                    fish: '马口,白条,鳜鱼,翘嘴',
                    tips: '路亚绝佳标点，浅滩结构丰富，建议用2-5克小亮片或小米诺。注意水位变化。',
                    images: [],
                    video: '',
                    likes: 8,
                    liked: false,
                    comments: [
                        { user: '路亚小张', text: '马口真的多，一下午几十条', time: '5小时前' }
                    ],
                    time: '2026-06-26 14:15',
                    author: '路亚先锋'
                }, {
                    id: Date.now() - 300000,
                    title: '⚠️ 避雷：东河大桥下游（电工出没）',
                    waterType: '天然河道',
                    isFree: '免费',
                    location: '德阳市·东河大桥下游1公里',
                    control: '无管制，但电工多',
                    depth: '2-3米',
                    bottom: '泥底',
                    fish: '鲫鱼,鲤鱼',
                    tips: '近期电工频繁出没，鱼情极差，不建议前往。已举报多次。',
                    images: [],
                    video: '',
                    likes: 3,
                    liked: false,
                    comments: [
                        { user: '热心钓友', text: '确实有电工，大家别去了', time: '1天前' }
                    ],
                    time: '2026-06-25 09:00',
                    author: '避雷专员'
                }];
                saveData();
            }
            renderFeed();
            if (document.getElementById('page-map').classList.contains('active')) {
                initMap();
            }
        }

        function saveData() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
            if (mapInstance) refreshMarkers();
        }

        // ---------- 渲染列表 ----------
        function renderFeed() {
            const feed = document.getElementById('feedList');
            let filtered = [...posts];
            if (currentFilter !== '全部') {
                filtered = filtered.filter(p => p.waterType === currentFilter || p.title.includes(currentFilter));
            }
            filtered.sort((a, b) => b.id - a.id);
            if (filtered.length === 0) {
                feed.innerHTML =
                `<div class="empty-state"><span class="icon">🏝️</span>暂无匹配的野钓点，快来发布第一个吧！</div>`;
                return;
            }
            let html = '';
            filtered.forEach(post => {
                const likeIcon = post.liked ? '❤️' : '🤍';
                const imgHtml = post.images && post.images.length > 0 ?
                    `<div class="card-media">${post.images.slice(0,3).map(img => `<img src="${img}" loading="lazy">`).join('')}</div>` :
                    '';
                const tags = `
                    <span class="tag free">${post.isFree}</span>
                    <span class="tag">${post.waterType}</span>
                    ${post.control.includes('禁钓') ? '<span class="tag warn">🚫 管制</span>' : ''}
                    ${post.tips.includes('避雷') || post.title.includes('避雷') ? '<span class="tag warn">⚠️ 避雷</span>' : ''}
                `;
                const locAttr = JSON.stringify(post.location);
                html += `
                    <div class="post-card" onclick="openDetail(${post.id})">
                        <div class="card-header">
                            <span class="card-title">${escapeHtml(post.title)}</span>
                            <span style="font-size:12px;color:var(--gray);">${escapeHtml(post.location.split('·')[0])}</span>
                        </div>
                        <div class="card-tags">${tags}</div>
                        <div class="card-desc">${escapeHtml(post.desc || post.tips || '')}</div>
                        ${imgHtml}
                        <div class="card-footer">
                            <span style="font-size:12px;">🎣 ${escapeHtml(post.fish || '多种野鱼')}</span>
                            <div class="actions">
                                <span onclick="event.stopPropagation();toggleLike(${post.id})">${likeIcon} ${post.likes}</span>
                                <span onclick="event.stopPropagation();openDetail(${post.id})">💬 ${post.comments ? post.comments.length : 0}</span>
                                <span onclick="event.stopPropagation();navigateTo(${locAttr})">🧭</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            feed.innerHTML = html;
        }

        // ---------- 辅助函数 ----------
        function escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        function genId() { return Date.now() + Math.floor(Math.random() * 1000); }

        // ---------- 分类筛选 ----------
        function filterByType(type) {
            currentFilter = type;
            renderFeed();
            switchPage('home');
        }

        // ---------- 点赞 ----------
        function toggleLike(id) {
            const post = posts.find(p => p.id === id);
            if (!post) return;
            post.liked = !post.liked;
            post.likes = post.liked ? (post.likes || 0) + 1 : (post.likes || 0) - 1;
            if (post.likes < 0) post.likes = 0;
            saveData();
            renderFeed();
            if (document.getElementById('detailModal').classList.contains('active')) openDetail(id);
        }

        // ---------- 详情弹窗 ----------
        function openDetail(id) {
            const post = posts.find(p => p.id === id);
            if (!post) return;
            const modal = document.getElementById('detailModal');
            const body = document.getElementById('modalBody');
            const likeIcon = post.liked ? '❤️' : '🤍';
            const imgHtml = post.images && post.images.length > 0 ?
                `<div style="display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;">${post.images.map(img => `<img src="${img}" style="width:calc(33.33%-6px);border-radius:12px;aspect-ratio:1/1;object-fit:cover;">`).join('')}</div>` :
                '';
            const commentsHtml = post.comments && post.comments.length > 0 ?
                post.comments.map(c =>
                    `<div style="padding:8px 0;border-bottom:1px solid #f0f4f0;font-size:14px;"><strong>${escapeHtml(c.user)}</strong> ${escapeHtml(c.text)} <span style="color:var(--gray);font-size:12px;float:right;">${escapeHtml(c.time)}</span></div>`
                    ).join('') :
                '<div class="text-muted" style="padding:12px 0;">暂无评论，发表第一条评论吧</div>';
            const locAttr = JSON.stringify(post.location);
            body.innerHTML = `
                <div class="modal-title">${escapeHtml(post.title)}</div>
                <div class="modal-meta">
                    <span class="tag free">${post.isFree}</span>
                    <span class="tag">${post.waterType}</span>
                    <span class="tag">📍 ${escapeHtml(post.location)}</span>
                    ${post.control.includes('禁钓') ? '<span class="tag warn">🚫 禁钓区</span>' : ''}
                </div>
                <div class="modal-body">
                    <div><strong>🐟 鱼种：</strong>${escapeHtml(post.fish || '未填写')}</div>
                    <div><strong>📏 水深：</strong>${escapeHtml(post.depth || '未知')} · <strong>底质：</strong>${escapeHtml(post.bottom || '未知')}</div>
                    ${post.tips ? `<div class="section-title">📝 实战攻略 / 避坑</div><div>${escapeHtml(post.tips)}</div>` : ''}
                    ${imgHtml}
                    <div class="section-title">💬 钓友评论 (${post.comments ? post.comments.length : 0})</div>
                    <div id="commentList">${commentsHtml}</div>
                    <div style="display:flex;gap:10px;margin:12px 0;">
                        <input type="text" id="commentInput" placeholder="写评论..." style="flex:1;padding:10px 14px;border:1.5px solid #dce4dc;border-radius:30px;outline:none;">
                        <button onclick="addComment(${post.id})" style="padding:10px 20px;background:var(--primary);color:white;border:none;border-radius:30px;cursor:pointer;">发送</button>
                    </div>
                    <div style="display:flex;gap:16px;padding:12px 0;border-top:1px solid #f0f4f0;margin-top:8px;flex-wrap:wrap;">
                        <span onclick="toggleLike(${post.id});openDetail(${post.id});" style="cursor:pointer;font-size:16px;">${likeIcon} ${post.likes}</span>
                        <span onclick="alert('已收藏 ❤️')" style="cursor:pointer;">⭐ 收藏</span>
                        <span onclick="navigateTo(${locAttr})" style="cursor:pointer;">🧭 一键导航</span>
                        <span onclick="sharePost(${post.id})" style="cursor:pointer;">📤 分享</span>
                    </div>
                    <div style="font-size:12px;color:var(--gray);margin-top:8px;">发布者：${escapeHtml(post.author || '匿名钓友')} · ${escapeHtml(post.time)}</div>
                </div>
            `;
            modal.classList.add('active');
        }
        function closeModal() { document.getElementById('detailModal').classList.remove('active'); }

        // ---------- 评论 ----------
        function addComment(id) {
            const input = document.getElementById('commentInput');
            if (!input || !input.value.trim()) return alert('请输入评论内容');
            const post = posts.find(p => p.id === id);
            if (!post) return;
            if (!post.comments) post.comments = [];
            post.comments.push({
                user: '钓友_' + Math.floor(Math.random() * 1000),
                text: input.value.trim(),
                time: new Date().toLocaleString('zh-CN', { hour12: false })
            });
            saveData();
            openDetail(id);
        }

        // ---------- 分享 ----------
        function sharePost(id) {
            const post = posts.find(p => p.id === id);
            if (!post) return;
            const text = `🎣 钓点宝 · 野钓分享\n📍 ${post.title}\n📌 ${post.location}\n🐟 ${post.fish || '多种野鱼'}\n查看详情：`;
            if (navigator.share) {
                navigator.share({ title: post.title, text: text, url: window.location.href });
            } else {
                alert(text + '\n（复制链接分享）');
            }
        }

        // ---------- 导航选择 ----------
        function navigateTo(address) {
            if (!address) { alert('该钓点暂无位置信息'); return; }
            navAddress = address;
            document.getElementById('navModal').style.display = 'flex';
        }
        function closeNavModal() {
            document.getElementById('navModal').style.display = 'none';
            navAddress = '';
        }
        function openMap(type) {
            if (!navAddress) return;
            const encoded = encodeURIComponent(navAddress);
            let url = '';
            if (type === 'baidu') {
                url = `https://api.map.baidu.com/direction?destination=${encoded}&output=html&src=钓点宝`;
            } else if (type === 'amap') {
                url = `https://uri.amap.com/navigation?dest=${encoded}&mode=car&coordinate=gaode`;
            }
            window.open(url, '_blank');
            closeNavModal();
        }

        // ---------- 发布 ----------
        function handlePublish() {
            const title = document.getElementById('pTitle').value.trim();
            const waterType = document.getElementById('pWaterType').value;
            const isFree = document.getElementById('pIsFree').value;
            const location = document.getElementById('pLocation').value.trim();
            const control = document.getElementById('pControl').value;
            const depth = document.getElementById('pDepth').value.trim();
            const bottom = document.getElementById('pBottom').value;
            const fish = document.getElementById('pFish').value.trim();
            const tips = document.getElementById('pTips').value.trim();
            if (!title || !location) { alert('请完整填写钓点名称和位置（必填）'); return; }
            if (isFree === '收费') { if (!confirm('⚠️ 本平台仅限纯野钓，发布收费钓点将被删除，确定继续吗？')) return; }
            if (control.includes('禁钓') || control.includes('禁止')) { if (!confirm('⚠️ 您选择的点位疑似禁钓/保护区，发布违规信息将导致封禁，确定继续吗？')) return; }
            const newPost = {
                id: genId(),
                title: title,
                waterType: waterType,
                isFree: isFree,
                location: location,
                control: control,
                depth: depth || '未填写',
                bottom: bottom,
                fish: fish || '多种野鱼',
                tips: tips || '暂无攻略，等待钓友补充',
                images: [],
                video: '',
                likes: 0,
                liked: false,
                comments: [],
                time: new Date().toLocaleString('zh-CN', { hour12: false }),
                author: '探钓新手'
            };
            posts.push(newPost);
            saveData();
            renderFeed();
            document.getElementById('pTitle').value = '';
            document.getElementById('pLocation').value = '';
            document.getElementById('pDepth').value = '';
            document.getElementById('pFish').value = '';
            document.getElementById('pTips').value = '';
            document.getElementById('imageInput').value = '';
            alert('✅ 野钓点位发布成功！等待后台审核（模拟）');
            switchPage('home');
        }

        // ---------- 工具 ----------
        function refreshWeather() {
            const score = Math.floor(Math.random() * 30) + 65;
            document.getElementById('weatherScore').textContent = score;
            const desc = document.querySelector('.weather-score .score-desc');
            if (score > 80) desc.innerHTML =
            `<div>气压 1012hPa · 温差 6℃</div><div style="color:var(--primary);font-weight:600;">✅ 溶氧量高，适宜出钓</div>`;
            else if (score > 65) desc.innerHTML =
                `<div>气压 1005hPa · 温差 10℃</div><div style="color:var(--gold);font-weight:600;">⛅ 一般，可钓但口可能轻</div>`;
            else desc.innerHTML =
                `<div>气压 998hPa · 温差 15℃</div><div style="color:var(--warn);font-weight:600;">❌ 气压低，鱼不开口，建议休息</div>`;
        }
        function addRecord() {
            const input = document.getElementById('recordInput');
            if (!input.value.trim()) return alert('请输入记录内容');
            const list = document.getElementById('recordList');
            const div = document.createElement('div');
            div.className = 'record-item flex-between';
            div.innerHTML =
                `<span>🐟 ${escapeHtml(input.value.trim())}</span><span class="text-muted">${new Date().toLocaleDateString()}</span>`;
            list.prepend(div);
            input.value = '';
            alert('✅ 渔获记录已保存');
        }

        // ---------- 页面切换 ----------
        function switchPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + page).classList.add('active');
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            const tabs = document.querySelectorAll('.tab-item');
            const map = { 'home': 0, 'map': 1, 'publish': 2, 'tools': 3, 'profile': 4 };
            if (map[page] !== undefined) tabs[map[page]].classList.add('active');
            window.scrollTo(0, 0);
            if (page === 'map' && !mapInstance) {
                initMap();
            } else if (page === 'map' && mapInstance) {
                refreshMarkers();
            }
        }

        // ---------- 公告轮播 ----------
        const notices = [
            '🚫 禁渔期：6-8月长江流域部分干流禁钓 · 请遵守当地法规',
            '🌿 生态垂钓：留大放小，带走垃圾，保护水域环境',
            '⚠️ 汛期提醒：近期多雨，请勿在陡坡、深水区作钓',
            '📢 举报有奖：发现电鱼、网工请立即拨打110'
        ];
        let noticeIdx = 0;
        setInterval(() => {
            noticeIdx = (noticeIdx + 1) % notices.length;
            document.getElementById('noticeText').textContent = notices[noticeIdx];
        }, 5000);

        // ============================================================
        //  高德地图初始化与标记管理（已使用你的Key）
        // ============================================================
        function initMap() {
            if (mapInstance) {
                mapInstance.setFitView();
                return;
            }
            if (typeof AMap === 'undefined') {
                alert('高德地图JS API未加载，请检查网络或Key是否正确');
                return;
            }
            mapInstance = new AMap.Map('mapContainer', {
                zoom: 12,
                center: [104.0668, 30.5728],
                mapStyle: 'amap://styles/whitesmoke',
                viewMode: '2D',
                pitch: 0,
            });
            geocoder = new AMap.Geocoder({ city: '' });
            refreshMarkers();
        }

        function refreshMarkers() {
            if (!mapInstance) return;
            if (markers.length > 0) {
                mapInstance.remove(markers);
                markers = [];
            }
            const allPosts = [...posts];
            if (allPosts.length === 0) return;
            let count = 0;
            allPosts.forEach(post => {
                const address = post.location;
                if (!address) return;
                geocoder.getLocation(address, function(status, result) {
                    if (status === 'complete' && result.geocodes.length > 0) {
                        const loc = result.geocodes[0];
                        const lng = loc.location.getLng();
                        const lat = loc.location.getLat();
                        const marker = new AMap.Marker({
                            position: [lng, lat],
                            title: post.title,
                            map: mapInstance,
                            label: {
                                content: `<div style="background:var(--primary);color:white;padding:2px 6px;border-radius:10px;font-size:12px;">${post.title}</div>`,
                                direction: 'top'
                            }
                        });
                        marker._postId = post.id;
                        const infoContent = `
                            <div style="max-width:200px;">
                                <strong>${escapeHtml(post.title)}</strong><br>
                                <span style="color:#666;font-size:13px;">${escapeHtml(post.location)}</span><br>
                                <span>🐟 ${escapeHtml(post.fish || '多种野鱼')}</span><br>
                                <span class="nav-link" onclick="navigateTo('${escapeHtml(post.location)}')">🧭 导航</span>
                            </div>
                        `;
                        const infoWindow = new AMap.InfoWindow({
                            content: infoContent,
                            offset: new AMap.Pixel(0, -30)
                        });
                        marker.on('click', function() {
                            infoWindow.open(mapInstance, this.getPosition());
                        });
                        markers.push(marker);
                        count++;
                        if (count === allPosts.length) {
                            mapInstance.setFitView(markers);
                        }
                    }
                });
            });
            if (allPosts.length === 0) {
                mapInstance.setCenter([104.0668, 30.5728]);
                mapInstance.setZoom(12);
            }
        }

        // ---------- 启动 ----------
        loadData();
        refreshWeather();

        document.getElementById('navModal').addEventListener('click', function(e) {
            if (e.target === this) closeNavModal();
        });
        document.getElementById('detailModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        console.log('🎣 钓点宝 · 纯野钓社区已启动（高德地图Key已植入）');
        console.log('🌿 注意：请在高德开发者中心将你的域名添加到安全域名列表');
    </script>
</body>
</html>