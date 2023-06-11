let board = document.getElementById('board');
let SQUARE_NUMBER = 506;


function game(field) {
    let colors = ['#FFFAB7', '#FFEEDE', '#B8AEEB', '#C7FBFF', '#BAFEC5', '#FFCADC']
    let defaultColor = '#2d2d2d'
    for (let i = 0; i < SQUARE_NUMBER; i++) {
            let square = document.createElement('div');
            square.classList.add('square');

            square.addEventListener('pointerover', () => {
                setColor(square);
            })

            square.addEventListener('pointerleave', (e) => {
                if (!e.target.classList.contains('constant')) {
                    removeColor(square, defaultColor);
                }
                
            })

            square.addEventListener('click', (e) => {
                e.target.classList.toggle('constant')
                setColor(e.target)
            })

            
            field.append(square)
    }



    function setColor(element) {
        let color = getRandomColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 15px ${color}`
    }

    function removeColor(element, defaultColor) {
        element.style.background = defaultColor;
        element.style.boxShadow = `0 0 2px #000`
    }

    function getRandomColor() {
        let index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    let clearBtn = document.querySelector('.clear-btn')
    clearBtn.addEventListener('click', () => {
        for (let elem of document.querySelectorAll('.constant')) {
            elem.classList.remove('constant')
            console.log(elem)
            removeColor(elem, defaultColor)
        }
    })
}
game(board)


