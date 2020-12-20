import Player from 'enum/Player';
import Move from 'enum/Move';

export default class AI{
	calculatePlay(cells: Player[]): number{
		let move = 0;
		let maxPoints: number = 0;
		let points: number = 0;
		for(let i = 0; i < cells.length; i++){
			points = 0;
			if(cells[i] === Player.NONE)
				if(i === 0){
					points += this.getPoints(cells[i + 1], cells[i + 2]);
					points += this.getPoints(cells[i + 3], cells[i + 6]);
					points += this.getPoints(cells[i + 4], cells[i + 8]);
				}else if(i === 1){
					points += this.getPoints(cells[i - 1], cells[i + 1]);
					points += this.getPoints(cells[i + 3], cells[i + 6]);
				}else if(i === 2){
					points += this.getPoints(cells[i - 1], cells[i - 2]);
					points += this.getPoints(cells[i + 3], cells[i + 6]);
					points += this.getPoints(cells[i + 2], cells[i + 4]);
				}else if(i === 3){
					points += this.getPoints(cells[i + 1], cells[i + 2]);
					points += this.getPoints(cells[i - 3], cells[i + 3]);
				}else if(i === 4){
					points += this.getPoints(cells[i - 1], cells[i + 1]);
					points += this.getPoints(cells[i - 3], cells[i + 3]);
					points += this.getPoints(cells[i - 4], cells[i + 4]);
					points += this.getPoints(cells[i - 2], cells[i + 2]);
				}else if(i === 5){
					points += this.getPoints(cells[i - 3], cells[i + 3]);
					points += this.getPoints(cells[i - 1], cells[i - 2]);
				}else if(i === 6){
					points += this.getPoints(cells[i + 1], cells[i + 2]);
					points += this.getPoints(cells[i - 3], cells[i - 6]);
					points += this.getPoints(cells[i - 2], cells[i - 4]);
				}else if(i === 7){
					points += this.getPoints(cells[i - 1], cells[i + 1]);
					points += this.getPoints(cells[i - 3], cells[i - 6]);
				}else if(i === 8){
					points += this.getPoints(cells[i - 1], cells[i - 2]);
					points += this.getPoints(cells[i - 3], cells[i - 6]);
					points += this.getPoints(cells[i - 4], cells[i - 8]);
				}
			if(points > maxPoints){
				maxPoints = points;
				move = i;
			}
		}
		return move + 1;
	}

	private getPoints(p1: Player, p2: Player): number{
		const rowStr = p1 + p2;
		let points = 0;
		const xCount = (rowStr.match(/X/g) || []).length;
		const oCount = (rowStr.match(/O/g) || []).length;
		if(!(xCount === 1 && oCount === 1))
			if(xCount === 1) points += Move.BLOCKER;
			else if(xCount === 2) points += Move.CLOSER;
			if(xCount === 0)
				if(oCount === 0) points += Move.OPENER;
				else if(oCount === 1) points += Move.THREAT;
				else points += Move.WINNER;
		return points;
	}
}
