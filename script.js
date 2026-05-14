document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const statusMessage = document.getElementById('status-message');
    const resultArea = document.getElementById('result-area');

    // 初期状態の設定
    startButton.textContent = "운명을 결정하세요!";
    startButton.disabled = false;

    /**
     * 擬似的な結果を生成し、表示を更新する関数
     */
    function generateResult() {
        const participants = ["Aさん", "Bさん", "Cさん", "Dさん", "Eさん"];
        
        // 参加者リストをシャッフルして当選順を決定
        const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
        
        // 順番に当選者を決定
        let resultHTML = '<h3>✨ 추첨 결과 ✨</h3>';
        resultHTML += '<ol>';
        
        shuffledParticipants.forEach((person, index) => {
            resultHTML += `<li><strong>${index + 1}번째: ${person}</strong> ${index === 0 ? '🏆 (최우수상)' : ''}</li>`;
        });
        resultHTML += '</ol>';

        return resultHTML;
    }

    /**
     * メインの抽選ロジック
     */
    function runLottery() {
        const inputParticipants = document.getElementById('participants_input').value.trim();
        
        if (!inputParticipants) {
            alert("参加者名を入力してください。カンマ区切りで入力できます。");
            return;
        }

        // 参加者名の処理（カンマ区切り対応）
        const participantsList = inputParticipants.split(',').map(name => name.trim()).filter(name => name.length > 0);

        if (participantsList.length < 2) {
            alert("抽選するには最低2名以上の参加者名が必要です。");
            return;
        }

        // UIの更新
        startButton.disabled = true;
        startButton.textContent = "추첨 중...";
        resultArea.innerHTML = '';
        statusMessage.textContent = '';


        // ★シミュレーションの実行 (アニメーションを伴う)
        let count = 0;
        const interval = setInterval(() => {
            count++;
            if (count < 20) {
                // 抽選中の表示をランダムなキラキラエフェクト
                const flashingText = Math.random() > 0.5 ? '✨' : '⭐';
                document.getElementById('status-message').textContent = `💫 ${flashingText} 추첨 중... ${flashingText} ${count * 5}% 완료`;
            } else {
                clearInterval(interval);
                
                // 最終結果の表示
                const finalResult = generateResult();
                document.getElementById('status-message').innerHTML = '';
                resultArea.innerHTML = finalResult;
                
                startButton.disabled = false;
                startButton.textContent = "다시 추첨하기";
            }
        }, 150);
    }

    // ボタンにイベントリスナーを設定
    startButton.addEventListener('click', runLottery);

    // 初期設定（初回起動時にボタンの状態をリセット）
    window.onload = () => {
        // ⚠️ 注意：今回のHTML構造に合わせて、参加者名入力欄を仮で追加します。
        const container = document.querySelector('.container');
        let inputSection = document.getElementById('input-section');
        if (!inputSection) {
            inputSection = document.createElement('div');
            inputSection.innerHTML = `
                <label for="participants_input" style="display: block; margin-top: 15px; margin-bottom: 8px; font-weight: bold; color: #333;">
                    参加者名入力 (カンマ区切り):
                </label>
                <input type="text" id="participants_input" placeholder="例: 김민준, 박서준, 이지우">
            `;
            container.insertBefore(inputSection, startButton);
        }
    };
});