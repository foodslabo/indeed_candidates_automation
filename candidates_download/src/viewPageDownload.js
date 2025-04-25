// viewPageDownload.js - 応募者の詳細ページでのダウンロードボタン

console.log("Indeed応募者詳細ページが検出されました");

// スリープ関数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ダウンロード処理を実行する関数
async function executeDownload() {
    console.log("ダウンロード処理を開始します...");

    try {
        // ダウンロードリンクを探す
        const downloadLink = document.querySelector('a[data-testid="download-original-application-link"]');

        if (downloadLink) {
            console.log("ダウンロードリンクを発見しました！クリックします...");
            downloadLink.click();

            // ダイアログが表示されるまで少し待機
            await sleep(1000);

            // ダウンロードボタンを探して押す
            const downloadButton = document.querySelector('button[data-testid="download-original-application-download-file"]');
            if (downloadButton) {
                console.log("ダウンロードボタンを発見しました！クリックします...");
                downloadButton.click();
                return true;
            } else {
                console.log("ダウンロードボタンが見つかりませんでした");
                return false;
            }
        } else {
            console.log("ダウンロードリンクが見つかりませんでした");
            return false;
        }
    } catch (error) {
        console.error("ダウンロード処理中にエラーが発生しました:", error);
        return false;
    }
}

// アカウントを切り替える関数
function switchAccount(accountType) {
    try {
        document.querySelector('button[data-testid="account-modal-toggle-expand"]').click()
        setTimeout(() => {
            linkButton = document.querySelector("div[role='treegrid'] a")
            console.log(linkButton)
            linkButton.click();
            return true;
        }, 1000)
    } catch (error) {
        console.error("アカウント切り替え中にエラーが発生しました:", error);
        return false;
    }
}

// ダウンロードボタンを作成する関数
function createSimpleDownloadButton() {
    // すでにボタンが存在する場合は追加しない
    if (document.getElementById('simple-download-button')) {
        return;
    }

    // オーバーレイコンテナを作成
    const overlay = document.createElement('div');
    overlay.id = 'download-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.gap = '20px';

    // メインダウンロードボタン要素を作成
    const downloadButton = document.createElement('button');
    downloadButton.id = 'simple-download-button';
    downloadButton.innerText = '応募データをダウンロード';
    downloadButton.style.padding = '30px 50px';
    downloadButton.style.backgroundColor = '#4285F4'; // Googleブルー
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '8px';
    downloadButton.style.fontSize = '24px';
    downloadButton.style.fontWeight = 'bold';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    downloadButton.style.transition = 'all 0.3s ease';

    // アカウント切り替えボタンのコンテナ
    const switchButtonsContainer = document.createElement('div');
    switchButtonsContainer.style.display = 'flex';
    switchButtonsContainer.style.justifyContent = 'center';
    switchButtonsContainer.style.gap = '15px';
    switchButtonsContainer.style.marginTop = '20px';

    // ホテルズラボボタン
    const hotelsButton = document.createElement('button');
    hotelsButton.innerText = 'アカウント切替';
    hotelsButton.style.padding = '12px 20px';
    hotelsButton.style.backgroundColor = '#FF9800'; // オレンジ
    hotelsButton.style.color = 'white';
    hotelsButton.style.border = 'none';
    hotelsButton.style.borderRadius = '5px';
    hotelsButton.style.fontSize = '16px';
    hotelsButton.style.fontWeight = 'bold';
    hotelsButton.style.cursor = 'pointer';
    hotelsButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    hotelsButton.style.transition = 'all 0.2s ease';

    // ホバー効果
    downloadButton.addEventListener('mouseover', () => {
        downloadButton.style.backgroundColor = '#3367D6'; // 濃いめのブルー
        downloadButton.style.transform = 'scale(1.1)';
    });

    downloadButton.addEventListener('mouseout', () => {
        downloadButton.style.backgroundColor = '#4285F4';
        downloadButton.style.transform = 'scale(1)';
    });

    hotelsButton.addEventListener('mouseover', () => {
        hotelsButton.style.backgroundColor = '#F57C00'; // 濃いめのオレンジ
        hotelsButton.style.transform = 'scale(1.05)';
    });

    hotelsButton.addEventListener('mouseout', () => {
        hotelsButton.style.backgroundColor = '#FF9800';
        hotelsButton.style.transform = 'scale(1)';
    });

    // メインダウンロードボタンのクリックイベント
    downloadButton.addEventListener('click', async () => {
        console.log('ワンクリックダウンロードボタンがクリックされました');

        // 処理中表示に変更
        downloadButton.innerText = 'ダウンロード中...';
        downloadButton.disabled = true;
        downloadButton.style.backgroundColor = '#cccccc';

        try {
            const success = await executeDownload();

            if (success) {
                // 処理完了後の表示
                downloadButton.innerText = 'ダウンロード完了！';
                setTimeout(() => {
                    // ダウンロード完了後、オーバーレイを削除
                    document.body.removeChild(overlay);
                }, 1500);
            } else {
                // エラー時の表示
                downloadButton.innerText = 'ダウンロード失敗';
                setTimeout(() => {
                    downloadButton.innerText = '応募データをダウンロード';
                    downloadButton.disabled = false;
                    downloadButton.style.backgroundColor = '#4285F4';
                }, 2000);
            }
        } catch (error) {
            console.error('ダウンロード中にエラーが発生しました:', error);
            downloadButton.innerText = 'エラー発生';
            setTimeout(() => {
                downloadButton.innerText = '応募データをダウンロード';
                downloadButton.disabled = false;
                downloadButton.style.backgroundColor = '#4285F4';
            }, 2000);
        }
    });

    // ホテルズラボボタンのクリックイベント
    hotelsButton.addEventListener('click', async () => {
        hotelsButton.innerText = '切替中...';
        hotelsButton.disabled = true;
        hotelsButton.style.backgroundColor = '#cccccc';

        const success = switchAccount('hotels');

        if (!success) {
            setTimeout(() => {
                hotelsButton.innerText = 'アカウント切替';
                hotelsButton.disabled = false;
                hotelsButton.style.backgroundColor = '#FF9800';
            }, 2000);
        }
    });
    // アカウント切り替えボタンをコンテナに追加
    switchButtonsContainer.appendChild(hotelsButton);

    // ボタンとアカウント切り替えコンテナをオーバーレイに追加
    overlay.appendChild(downloadButton);
    overlay.appendChild(switchButtonsContainer);

    // オーバーレイをページに追加
    document.body.appendChild(overlay);
    console.log('ワンクリックダウンロードボタンとアカウント切り替えボタンが追加されました');
}

// ページ読み込み後に実行
window.addEventListener('load', async () => {
    console.log("ページが読み込まれました");

    // ボタンを少し遅延して追加（ページの読み込みが完全に終わってから）
    setTimeout(() => {
        createSimpleDownloadButton();
    }, 1500);
});

// DOMの変更を監視して、ページが動的に更新された場合もボタンを表示する
const observer = new MutationObserver((mutations) => {
    // ボタンがなければ作成
    if (!document.getElementById('download-overlay')) {
        createSimpleDownloadButton();
    }
});

// 監視の開始（bodyタグの下の変更を監視）
observer.observe(document.body, {childList: true, subtree: true});