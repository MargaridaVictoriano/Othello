// checks if someone can play
function hasMoves(playerToCheck, opponentToCheck) {
    let counter = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (canPlay(i, j, playerToCheck, opponentToCheck)) {
                counter++;
            }
        }
    }
    if (counter > 0) return true;
}

// adds every disc to be flipped to an array, calls flip
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