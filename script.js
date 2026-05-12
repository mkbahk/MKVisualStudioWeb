document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');

    generateBtn.addEventListener('click', generateLottoNumbers);
});

function generateLottoNumbers() {
    // 로또 번호는 1부터 45 사이에서 중복 없이 5개를 선택합니다.
    const numbers = [];
    const totalNumbers = 45;
    const count = 5;

    // 1부터 45까지의 숫자 중 무작위로 5개를 선택하기 위해 배열을 섞습니다.
    const shuffled = Array.from({ length: totalNumbers }, (_, i) => i + 1)
                      .sort(() => Math.random() - 0.5); // Fisher-Yates 알고리즘의 간소화 버전

    // 앞의 5개 숫자를 선택합니다.
    const lottoNumbers = shuffled.slice(0, count);

    // 결과를 화면에 표시합니다.
    if (lottoNumbers.length === count) {
        resultDiv.innerHTML = `<h2>🎉 당첨 번호 🎉</h2><p>${lottoNumbers.join(' | ')}</p>`;
    } else {
        resultDiv.innerHTML = '<p>번호를 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.</p>';
    }
}