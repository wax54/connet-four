/*
describe('template', () => {
    it('should ', () => {
        expect(1).toEqual(1);
    });
});
*/

describe('resetGame()', () => {
    beforeEach(() => {
        DROPSPEED = 0;
        handleClick({ target: document.getElementById('1') });

    });
    it('should reset the in-memory board', (done) => {
        setTimeout(() => {
            expect(board[5][1]).not.toEqual(null);
            resetGame();
            expect(board[5][1]).toEqual(null);
            done();
        }, 50);
    });
    it('should reset the currPlayer to 1', (done) => {
        setTimeout(() => {
            expect(currPlayer).toEqual(2);
            resetGame();
            expect(currPlayer).toEqual(1);
            done();
        }, 50);
    });
    it('should reset the game over variable', (done) => {
        gameOver = true;
        setTimeout(() => {
            resetGame();
            expect(gameOver).toEqual(false);
            done();
        }, 50);
    });
    it('should update the height and width', (done) => {
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        setTimeout(() => {
            widthInput.value = 9;
            heightInput.value = 5;
            expect(WIDTH).toEqual(7);
            expect(HEIGHT).toEqual(6);
            resetGame();
            expect(WIDTH).toEqual(9);
            expect(HEIGHT).toEqual(5);
            done();
        }, 50);
    });

    afterEach(() => {
        DROPSPEED = 200;
        document.getElementById('width').value = 7;
        document.getElementById('height').value = 6;
        resetGame();
    });
});

describe('handleClick()', () => {
    it('when evt.target.id = 1 there should be a piece in the element "5-1"', (done) => {
        DROPSPEED = 0;
        //drop the piece
        handleClick({ target: document.getElementById('1') });
        //wait for the piece to drop
        setTimeout(() => {
            //test if the piece is there
            const cell = document.getElementById('5-1');
            expect(cell.innerHTML.length).not.toEqual(0);
            //#cleanUp
            resetGame();
            DROPSPEED = 200; 
            done();
        }, 50);

    });
});
describe('addToTable()', () => {
    it('should add specified piece into DOM at (y, x)', () => {
        expect(document.getElementById('1-1').innerHTML).toEqual('');
        const piece = createPiece();
        addToTable(piece, 1, 1);
        expect(document.getElementById('1-1').innerHTML).not.toEqual('');
        piece.remove();
    });
});
describe('dimensionChanged()', () => {
    beforeEach(() => {
        DROPSPEED = 0;
    });

    it('should update the board to the new dimensions if no tokens have been played', () => {

        //testing Height
        expect(document.getElementById('7-1')).toEqual(null)

        document.getElementById('height').value = 8;
        dimensionsChanged();

        expect(document.getElementById('7-1')).not.toEqual(null)
        expect(HEIGHT).toEqual(8);

        //testing Width
        expect(document.getElementById('1-7')).toEqual(null)

        document.getElementById('width').value = 8;
        dimensionsChanged();

        expect(document.getElementById('1-7')).not.toEqual(null)
        expect(WIDTH).toEqual(8);

    });
    it('should not update the board if a token has been played', (done) => {
        //pretesting Height
        expect(document.getElementById('7-1')).toEqual(null)
        //pretesting Width
        expect(document.getElementById('1-7')).toEqual(null)

        //drop a piece
        handleClick({ target: document.getElementById('1') });
        setTimeout(() => {
            //height
            document.getElementById('height').value = 8;
            dimensionsChanged();

            expect(document.getElementById('7-1')).toEqual(null)
            expect(HEIGHT).not.toEqual(8);

            //width
            document.getElementById('width').value = 8;
            dimensionsChanged();

            expect(document.getElementById('1-7')).toEqual(null)
            expect(WIDTH).not.toEqual(8);
            //#done
            done();
        }, 15);

    });
    it('should update the userNote if a token has been played', (done) => {

        //drop a piece
        handleClick({ target: document.getElementById('1') });
        setTimeout(() => {
            //width
            document.getElementById('width').value = 8;
            dimensionsChanged();
            const note = document.getElementById('user-note').innerText;
            expect(note.length).not.toEqual(0);
            done();
        }, 15);
    });
    afterEach(() => {
        DROPSPEED = 200; 
        document.getElementById('width').value = 7;
        document.getElementById('height').value = 6;
        resetGame();
    });
    afterAll((done) => {
        setTimeout(() => {
            resetGame();
            done();
        }, 50)
    });
});
describe('updateUserNote()', () => {
    it('update the user note with passed string', () => {
        const note = document.getElementById('user-note');
        expect(note.innerText.length).toEqual(0);
        updateUserNote('Hello');
        expect(note.innerText).toEqual('Hello');
    });
});
describe('updateWidth()', () => {
    it('should change the WIDTH variable', () => {
        document.getElementById('width').value = 8;
        updateWidth();
        expect(document.getElementById('4-7')).toEqual(null)
        expect(WIDTH).toEqual(8);
    });
    afterEach(() => {
        document.getElementById('width').value = 7;
        updateWidth();
    });
});
describe('updateHeight()', () => {
    it('should change the HEIGHT variable', () => {
        document.getElementById('height').value = 8;
        updateHeight();
        expect(document.getElementById('7-1')).toEqual(null)
        expect(HEIGHT).toEqual(8);
    });
    afterEach(() => {
        document.getElementById('height').value = 6;
        updateHeight();
    });
});
describe('repeat()', () => {
    it('should repeat a function, as many times as inputted.', () => {
        let counter = 0;
        repeat(10, () => { counter++; })
        expect(counter).toEqual(10);

        counter = 0;
        repeat(0, () => { counter++; })
        expect(counter).toEqual(0);
    });

    it('should pass the iteration and other variables to the function', () => {
        let test = [];
        repeat(2, (i, secretNumber, specialWord) => {
            test[i] = secretNumber + specialWord;
            secretNumber = secretNumber + 10;
        }, 42, 'hello');
        expect(test[0]).toEqual('42hello');
        expect(test[1]).toEqual('42hello');
    });
});






