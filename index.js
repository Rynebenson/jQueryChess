// could use this file to store all javascript code

function pathIsOpen(src, dest) {
    let srcCol = src.charAt(0);
    let srcRow = src.charAt(1);
    let destCol = dest.charAt(0);
    let destRow = dest.charAt(1);
    let currCol = srcCol;
    let currRow = srcRow;

    // If this is a diagonal path
    if(srcCol !== destCol && srcRow !== destRow) {

        // Determine direction to traverse
        if(srcCol < destCol) // left-to-right
        {
            if(srcRow > destRow) // top-to-bottom
            {
                currCol = nextCol[currCol];
                for(currRow = --currRow; currRow > destRow; currRow--) {
                    if($(`#${currCol+currRow}`).hasClass("containsPiece")) {
                        return false;
                    }
                    currCol = nextCol[currCol];
                }
            }
            else // bottom-to-top
            {
                currCol = nextCol[currCol];
                for(currRow = ++currRow; currRow < destRow; currRow++) {
                    if($(`#${currCol+currRow}`).hasClass("containsPiece")) {
                        return false;
                    }
                    currCol = nextCol[currCol];
                }
            }
        }
        else // right-to-left
        {
            if(srcRow > destRow) // top-to-bottom
            {
                currCol = prevCol[currCol];
                for(currRow = --currRow; currRow > destRow; currRow--) {
                    if($(`#${currCol+currRow}`).hasClass("containsPiece")) {
                        return false;
                    }
                    currCol = prevCol[currCol];
                }
            }
            else // bottom-to-top
            {
                currCol = prevCol[currCol];
                for(currRow = ++currRow; currRow < destRow; currRow++) {
                    if($(`#${currCol+currRow}`).hasClass("containsPiece")) {
                        return false;
                    }
                    currCol = prevCol[currCol];
                }
            }
        }
    }

    // if this is a vertical path
    else if(srcCol === destCol) {
        // determine the direction to traverse
        if(srcRow < destRow) // bottom-to-top
        {
            for(currRow = ++currRow; currRow < destRow; currRow++) {
                if($(`#${srcCol + currRow}`).hasClass("containsPiece")) {
                    return false;
                }
            }
        }
        else // top-to-bottom
        {
            for(currRow = --currRow; currRow > destRow; currRow--) {
                if($(`#${srcCol + currRow}`).hasClass("containsPiece")) {
                    return false;
                }
            }
        }
    }
    else // this is a horizontal path
    {
        // determine the direction to traverse
        if(srcCol < destCol) // left-to-right
        {
            for(currCol = nextCol[currCol]; currCol < destCol; currCol = nextCol[currCol]) {
                if($(`#${ currCol + srcRow }`).hasClass("containsPiece")) {
                    return false;
                }
            }
        }
        else // right-to-left
        {
            for(currCol = prevCol[currCol]; currCol > destCol; currCol = prevCol[currCol]) {
                if($(`#${ currCol + srcRow }`).hasClass("containsPiece")) {
                    return false;
                }
            }
        }
    }

    return true;
}

function evaluatePotentialMoves(location, pieceType, isFirstMove=false) {
    let potentialDestinations = [];
    let col = location.charAt(0);
    let row = location.charAt(1);

    switch(pieceType) {
        case "pawn":
            potentialDestinations.push(col + ((1*row)+1));
            potentialDestinations.push(col + (row-1));

            // pawns can move forward (or backward depending on team) 2 spaces on their first move only
            if(isFirstMove){
                potentialDestinations.push(col + ((1*row)+2));
                potentialDestinations.push(col + (row-2));
            }

            // and pawns can attack diagonally
            potentialDestinations.push(nextCol[col] + ((1*row)+1));
            potentialDestinations.push(prevCol[col] + ((1*row)+1));
            potentialDestinations.push(nextCol[col] + (row-1));
            potentialDestinations.push(prevCol[col] + (row-1));

            break;
        case "rook":
            for(let i=1; i <= 8; i++){
                potentialDestinations.push(col + i);
            }
            for(const key in nextCol){
                potentialDestinations.push(key + row);
            }
            potentialDestinations.push(`H${row}`);
            break;
        case "knight":
            potentialDestinations.push(prevCol[prevCol[col]] + ((1*row)+1));
            potentialDestinations.push(prevCol[prevCol[col]] + (row-1));
            potentialDestinations.push(prevCol[col] + ((1*row)+2));
            potentialDestinations.push(prevCol[col] + (row-2));
            potentialDestinations.push(nextCol[nextCol[col]] + ((1*row)+1));
            potentialDestinations.push(nextCol[nextCol[col]] + (row-1));
            potentialDestinations.push(nextCol[col] + ((1*row)+2));
            potentialDestinations.push(nextCol[col] + (row-2));
            break;
        case "bishop":
            var currCol = col;
            var incRow = row;
            var decRow = row;

            // step backwards through columns
            while(currCol !== 'A') {
                currCol = prevCol[currCol];
                if(incRow < 8) {
                    potentialDestinations.push(currCol + (++incRow));
                }
                if(decRow > 1) {
                    potentialDestinations.push(currCol + (--decRow));
                }
            }

            // reset
            currCol = col;
            incRow = row;
            decRow = row;

            // step forwards through columns
            while(currCol !== 'H') {
                currCol = nextCol[currCol];
                if(incRow < 8) {
                    potentialDestinations.push(currCol + (++incRow));
                }
                if(decRow > 1) {
                    potentialDestinations.push(currCol + (--decRow));
                }
            }
            break;
        case "queen":
            // Queen can move like a rook
            for(let i=1; i <= 8; i++){
                potentialDestinations.push(col + i);
            }
            for(const key in nextCol){
                potentialDestinations.push(key + row);
            }
            potentialDestinations.push(`H${row}`);

            // And like a bishop :)

            var currCol = col;
            var incRow = row;
            var decRow = row;

            // step backwards through columns
            while(currCol !== 'A') {
                currCol = prevCol[currCol];
                if(incRow < 8) {
                    potentialDestinations.push(currCol + (++incRow));
                }
                if(decRow > 1) {
                    potentialDestinations.push(currCol + (--decRow));
                }
            }

            // reset
            currCol = col;
            incRow = row;
            decRow = row;

            // step forwards through columns
            while(currCol !== 'H') {
                currCol = nextCol[currCol];
                if(incRow < 8) {
                    potentialDestinations.push(currCol + (++incRow));
                }
                if(decRow > 1) {
                    potentialDestinations.push(currCol + (--decRow));
                }
            }

            break;
        case "king":
            potentialDestinations.push(col + ((1*row)+1));
            potentialDestinations.push(col + (row-1));
            potentialDestinations.push(nextCol[col] + ((1*row)+1));
            potentialDestinations.push(nextCol[col] + row);
            potentialDestinations.push(nextCol[col] + (row-1));
            potentialDestinations.push(prevCol[col] + ((1*row)+1));
            potentialDestinations.push(prevCol[col] + row);
            potentialDestinations.push(prevCol[col] + (row-1));
            break;
    }

    return potentialDestinations;
}

function evaluateValidMoves(location, isFirstMove=false) {

    // find piece
    let pieceAtLocation = $(`#${location} div`);

    // determine which team we are evaluating moves for
    let team = $(pieceAtLocation).hasClass("blackTeam") ? "blackTeam" : "whiteTeam";

    // determine piece type
    let pieceType = pieceAtLocation[0].classList[1];

    // assume all moves are valid (except those with falsy values)
    let potentialMoves = evaluatePotentialMoves(location, pieceType, isFirstMove).filter(Boolean);
    let validMoves = potentialMoves;

    for(let i=0; i < potentialMoves.length; i++) {

        // make sure location is on the board (should always be true)
        if(!locationIsValid(potentialMoves[i])) {
            delete validMoves[i];
            continue;
        }

        // find destination element
        let dest = potentialMoves[i];
        let destElem = $(`#${dest}`);

        // If a destination has own team's piece, invalidate move
        if(destElem.hasClass("containsPiece")) {
            if($(`#${dest} div`).hasClass(team)) {
                delete validMoves[i];
                continue;
            }
        }

        // Pawns can't move backwards (direction depends on team)
        if(pieceType === "pawn") {
            let srcRow = location.charAt(1);
            let destRow = dest.charAt(1);
            if(team === "blackTeam") {
                if(destRow > srcRow) {
                    delete validMoves[i];
                    continue;
                }
            }
            else {
                if(destRow < srcRow) {
                    delete validMoves[i];
                    continue;
                }
            }

            // Pawns also can't move diagonally unless it is an attack
            let srcCol = location.charAt(0);
            let destCol = dest.charAt(0);
            if(srcCol !== destCol) {
                // if destination is empty, invalidate diagonal move
                if(!destElem.hasClass("containsPiece")) {
                    delete validMoves[i];
                    continue;
                }
            }
            // Pawns also can't attack forward
            else {
                // if destination is nonempty, invalidate forward move
                if(destElem.hasClass("containsPiece")) {
                    delete validMoves[i];
                    continue;
                }
            }
        }

        // If there is a piece blocking the path, invalidate move (except knights can jump)
        if(pieceType !== "knight") {
            if(!pathIsOpen(location, potentialMoves[i])) {
                delete validMoves[i];
                continue;
            }
        }
    }

    // return validMoves with any falsy elements removes
    return validMoves.filter(Boolean);
}