export const getLottoNumbers = () => {
	const numbers = [];
	while (numbers.length < 6) {
		const randomNum = Math.ceil(Math.random() * 45);
		const hasNumber = numbers.filter(num => num === randomNum).length > 0;
		if (!hasNumber)
			numbers.push(randomNum); 
	}
	return numbers.sort((a, b) => a - b);
}

export const getLatestDrawNo = () => {
	const standardNo = 1133, standardDate = new Date('2024-08-17 21:00');
	const today = new Date();
	let diff = Math.abs(today.getTime() - standardDate.getTime());
	diff = Math.floor(diff / (1000 * 60 * 60 * 24));
	return standardNo + Math.floor(diff / 7);
}

export const getHistoricalLottoInfo = async (drawNo) => {
	const url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=' + drawNo;
	const res = await fetch(url);
	const info = await res.json();

	return {
		drawNo,
		drawDate: info.drwNoDate,
		lottoNumbers: [info.drwtNo1, info.drwtNo2, info.drwtNo3, info.drwtNo4, info.drwtNo5, info.drwtNo6],
		bonusNumber: info.bnusNo,
		firstPrize: info.firstWinamnt,
		noWinners: info.firstPrzwnerCo,
	};
}

export const getHistoricalLottoInfoByDate = async (date) => {
	const oldDate = new Date(date);
	const standardNo = 1133, standardDate = new Date('2024-08-17 21:00');
	let diff = Math.abs(oldDate.getTime() - standardDate.getTime());
	diff = Math.floor(diff / (1000 * 60 * 60 * 24))
	const drawNo = standardNo - Math.ceil(diff / 7);

	const url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=' + drawNo;
	const res = await fetch(url);
	const info = await res.json();

	return {
		drawNo,
		drawDate: info.drwNoDate,
		lottoNumbers: [info.drwtNo1, info.drwtNo2, info.drwtNo3, info.drwtNo4, info.drwtNo5, info.drwtNo6],
		bonusNumber: info.bnusNo,
		firstPrize: info.firstWinamnt,
		noWinners: info.firstPrzwnerCo,
	};
}
