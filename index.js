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