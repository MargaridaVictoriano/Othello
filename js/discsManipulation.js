// adds every disc to be flipped, calls flip
function reversePlay(i, j, player, opponent)
{
    let toBeFlipped = [];
    let mi, mj, c;

    // flips each disc one by one given an array
    function flip(toFlip, player) {
        for (let i = 0; i < toFlip.length; i++) {
            let point = toFlip.pop();
            discs[point.valueI][point.valueJ] = player;
        }
        drawTable();
    }

    // moving right
    mi = i - 1;
    mj = j;
    c = 0;
    while (mi > 0 && discs[mi][mj] === opponent) {
        mi--;
        c++;
    }
    if (mi >= 0 && discs[mi][mj] === player && c > 0) {
        mi++;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi++;
        }
    }

    // moving left
    mi = i + 1;
    mj = j;
    c = 0;
    while (mi < 7 && discs[mi][mj] === opponent) {
        mi++;
        c++;
    }
    if (mi <= 7 && discs[mi][mj] === player && c > 0) {
        mi--;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
        }
    }

    // moving down
    mi = i;
    mj = j - 1;
    c = 0;
    while (mi > 0 && discs[mi][mj] === opponent) {
        mj--;
        c++;
    }
    if (mi >= 0 && discs[mi][mj] === player && c > 0) {
        mj++;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj++;
        }
    }

    // moving up
    mi = i;
    mj = j + 1;
    c = 0;
    while (mj < 7 && discs[mi][mj] === opponent) {
        mj++;
        c++;
    }
    if (mj <= 7 && discs[mi][mj] === player && c > 0) {
        mj--;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj--;
        }
    }

    // move up right
    mi = i - 1;
    mj = j + 1;
    c = 0;
    while (mi > 0 && mj < 7 && discs[mi][mj] === opponent) {
        mi--;
        mj++;
        c++;
    }
    if (mi >= 0 && mj <= 7 && discs[mi][mj] === player && c > 0) {
        mj--;
        mi++;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj--;
            mi++;
        }
    }

    //move up left
    mi = i + 1;
    mj = j + 1;
    c = 0;
    while (mi < 7 && mj < 7 && discs[mi][mj] === opponent) {
        mi++;
        mj++;
        c++;
    }
    if (mi <= 7 && mj <= 7 && discs[mi][mj] === player && c > 0) {
        mi--;
        mj--;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
            mj--;
        }
    }

    // move down right
    mi = i - 1;
    mj = j - 1;
    c = 0;
    while (mi > 0 && mj > 0 && discs[mi][mj] === opponent) {
        mi--;
        mj--;
        c++;
    }
    if (mi >= 0 && mj >= 0 && discs[mi][mj] === player && c > 0) {
        mi++;
        mj++;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi++;
            mj++;
        }
    }

    // moving down left YAY it works
    mi = i + 1;
    mj = j - 1;
    c = 0;
    while (mi < 7 && mj > 0 && discs[mi][mj] === opponent) {
        mi++;
        mj--;
        c++;
    }
    if (mi <= 7 && mj >= 0 && discs[mi][mj] === player && c > 0) {
        mi--;
        mj++;
        while (discs[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
            mj++;
        }
    }

    flip(toBeFlipped, player);
}


// returns true is a position can be played
function canPlay(i, j, player, opponent) {
    let mi, mj, c;

    if (discs[i][j] === opponent || discs[i][j] === player) {
        return false;
    } else {
        // moving right
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mi--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) {
            return true;
        }

        // moving left
        mi = i + 1;
        mj = j;
        c = 0;
        while (mi < 7 && discs[mi][mj] === opponent) {
            mi++;
            c++;
        }
        if (mi <= 7 && discs[mi][mj] === player && c > 0) return true;

        // moving down
        mi = i;
        mj = j - 1;
        c = 0;
        while (mi > 0 && discs[mi][mj] === opponent) {
            mj--;
            c++;
        }
        if (mi >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move up
        mi = i;
        mj = j + 1;
        c = 0;
        while (mj < 7 && discs[mi][mj] === opponent) {
            mj++;
            c++;
        }
        if (mj <= 7 && discs[mi][mj] === player && c > 0) return true;

        //move up right
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while (mi > 0 && mj > 0 && discs[mi][mj] === opponent) {
            mi--;
            mj--;
            c++;
        }
        if (mi >= 0 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move up left
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while (mi > 0 && mj < 7 && discs[mi][mj] === opponent) {
            mi--;
            mj++;
            c++;
        }
        if (mi >= 0 && mj <= 7 && discs[mi][mj] === player && c > 0) return true;

        //move down right
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while (mi < 7 && mj > 0 && discs[mi][mj] === opponent) {
            mi++;
            mj--;
            c++;
        }
        if (mi <= 7 && mj >= 0 && discs[mi][mj] === player && c > 0) return true;

        //move down left
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while (mi < 7 && mj < 7 && discs[mi][mj] === opponent) {
            mi++;
            mj++;
            c++;
        }
        if (mi <= 7 && mj <= 7 && discs[mi][mj] === player && c > 0)
            return true;
        else
            return false;
    }
}

// returns true is a position can be played
function canPlay2(i, j, player, opponent) {
    let mi, mj, c;

    if (currentBoard[i][j] === opponent || currentBoard[i][j] === player) {
        return false;
    } else {
        // moving right
        mi = i - 1;
        mj = j;
        c = 0;
        while (mi > 0 && currentBoard[mi][mj] === opponent) {
            mi--;
            c++;
        }
        if (mi >= 0 && currentBoard[mi][mj] === player && c > 0) {
            return true;
        }

        // moving left
        mi = i + 1;
        mj = j;
        c = 0;
        while (mi < 7 && currentBoard[mi][mj] === opponent) {
            mi++;
            c++;
        }
        if (mi <= 7 && currentBoard[mi][mj] === player && c > 0) return true;

        // moving down
        mi = i;
        mj = j - 1;
        c = 0;
        while (mi > 0 && currentBoard[mi][mj] === opponent) {
            mj--;
            c++;
        }
        if (mi >= 0 && currentBoard[mi][mj] === player && c > 0) return true;

        //move up
        mi = i;
        mj = j + 1;
        c = 0;
        while (mj < 7 && currentBoard[mi][mj] === opponent) {
            mj++;
            c++;
        }
        if (mj <= 7 && currentBoard[mi][mj] === player && c > 0) return true;

        //move up right
        mi = i - 1;
        mj = j - 1;
        c = 0;
        while (mi > 0 && mj > 0 && currentBoard[mi][mj] === opponent) {
            mi--;
            mj--;
            c++;
        }
        if (mi >= 0 && mj >= 0 && currentBoard[mi][mj] === player && c > 0) return true;

        //move up left
        mi = i - 1;
        mj = j + 1;
        c = 0;
        while (mi > 0 && mj < 7 && currentBoard[mi][mj] === opponent) {
            mi--;
            mj++;
            c++;
        }
        if (mi >= 0 && mj <= 7 && currentBoard[mi][mj] === player && c > 0) return true;

        //move down right
        mi = i + 1;
        mj = j - 1;
        c = 0;
        while (mi < 7 && mj > 0 && currentBoard[mi][mj] === opponent) {
            mi++;
            mj--;
            c++;
        }
        if (mi <= 7 && mj >= 0 && currentBoard[mi][mj] === player && c > 0) return true;

        //move down left
        mi = i + 1;
        mj = j + 1;
        c = 0;
        while (mi < 7 && mj < 7 && currentBoard[mi][mj] === opponent) {
            mi++;
            mj++;
            c++;
        }
        if (mi <= 7 && mj <= 7 && currentBoard[mi][mj] === player && c > 0)
            return true;
        else
            return false;
    }
}


function reversePlay2(i, j, player, opponent)
{
    let toBeFlipped = [];
    let mi, mj, c;

    // flips each disc one by one given an array
    function flip(toFlip, player) {
        for (let i = 0; i < toFlip.length; i++) {
            let point = toFlip.pop();
            currentBoard[point.valueI][point.valueJ] = player;
        }
        drawTable();
    }

    // moving right
    mi = i - 1;
    mj = j;
    c = 0;
    while (mi > 0 && currentBoard[mi][mj] === opponent) {
        mi--;
        c++;
    }
    if (mi >= 0 && currentBoard[mi][mj] === player && c > 0) {
        mi++;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi++;
        }
    }

    // moving left
    mi = i + 1;
    mj = j;
    c = 0;
    while (mi < 7 && currentBoard[mi][mj] === opponent) {
        mi++;
        c++;
    }
    if (mi <= 7 && currentBoard[mi][mj] === player && c > 0) {
        mi--;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
        }
    }

    // moving down
    mi = i;
    mj = j - 1;
    c = 0;
    while (mi > 0 && currentBoard[mi][mj] === opponent) {
        mj--;
        c++;
    }
    if (mi >= 0 && currentBoard[mi][mj] === player && c > 0) {
        mj++;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj++;
        }
    }

    // moving up
    mi = i;
    mj = j + 1;
    c = 0;
    while (mj < 7 && currentBoard[mi][mj] === opponent) {
        mj++;
        c++;
    }
    if (mj <= 7 && currentBoard[mi][mj] === player && c > 0) {
        mj--;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj--;
        }
    }

    // move up right
    mi = i - 1;
    mj = j + 1;
    c = 0;
    while (mi > 0 && mj < 7 && currentBoard[mi][mj] === opponent) {
        mi--;
        mj++;
        c++;
    }
    if (mi >= 0 && mj <= 7 && currentBoard[mi][mj] === player && c > 0) {
        mj--;
        mi++;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mj--;
            mi++;
        }
    }

    //move up left
    mi = i + 1;
    mj = j + 1;
    c = 0;
    while (mi < 7 && mj < 7 && currentBoard[mi][mj] === opponent) {
        mi++;
        mj++;
        c++;
    }
    if (mi <= 7 && mj <= 7 && currentBoard[mi][mj] === player && c > 0) {
        mi--;
        mj--;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
            mj--;
        }
    }

    // move down right
    mi = i - 1;
    mj = j - 1;
    c = 0;
    while (mi > 0 && mj > 0 && currentBoard[mi][mj] === opponent) {
        mi--;
        mj--;
        c++;
    }
    if (mi >= 0 && mj >= 0 && currentBoard[mi][mj] === player && c > 0) {
        mi++;
        mj++;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi++;
            mj++;
        }
    }

    // moving down left YAY it works
    mi = i + 1;
    mj = j - 1;
    c = 0;
    while (mi < 7 && mj > 0 && currentBoard[mi][mj] === opponent) {
        mi++;
        mj--;
        c++;
    }
    if (mi <= 7 && mj >= 0 && currentBoard[mi][mj] === player && c > 0) {
        mi--;
        mj++;
        while (currentBoard[mi][mj] === opponent) {
            toBeFlipped.push({valueI: mi, valueJ: mj});
            flip(toBeFlipped, player);
            mi--;
            mj++;
        }
    }

    flip(toBeFlipped, player);
}
