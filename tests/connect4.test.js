/*
describe('template', () => {
    it('should ', () => {
        expect(1).toEqual(1);
    });
});
*/

describe('handleClick', () => {
    it('when evt.target.id = 1 there should be a piece in the element "5-1"', (done) => {
        //drop the piece
        handleClick({ target: document.getElementById('1') });
        //wait for the piece to drop
        setTimeout(() => {
            //test if the piece is there
            const cell = document.getElementById('5-1');
            expect(cell.innerHTML.length).not.toEqual(0);
            //#cleanUp
            resetGame();
            done();
        }, 1000);


    });
});

describe('dimensionChanged()', () => {
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
        }, 1000);

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
        }, 1000);
    });
    afterEach(() => {
        document.getElementById('width').value = 7;
        document.getElementById('height').value = 6;
        resetGame();
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






