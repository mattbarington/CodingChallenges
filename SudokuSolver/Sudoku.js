class Board {
	constructor(board) {
		this.board = board;
		this.notes = new Array[9];
		for (var i = 0 ; i < 9; i++)
			notes[i] = new Array[9];
		this.unsolved = 81;
	}

	getColumn(col) {
		return []
	}

	getRow(row) {
		return []
	}

	getBox(r,c) {
		return [[]]
	}
	
	solve() {
		while (this.unsolved > 0) {
			for (var i = 0; i < 9; i++) {
				clearRow();
				clearCol();
				clearBox();
			}
		}
	}
	
	clearRow(r) {
		var row = getRow(r)
		this.notes[r] = this.notes[r].filter( ( num ) => !row.includes(num) );
		
	}
	
	clearCol(col) {
		get
	}
	
	clearBox() {
		
	}
	
}


console.log("hello");