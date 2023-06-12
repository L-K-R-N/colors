let board = document.getElementById('board');
// let SQUARE_NUMBER = 506;
let boardSize = 20;


function game() {
    let colors = ['#FFFAB7', '#FFEEDE', '#B8AEEB', '#C7FBFF', '#BAFEC5', '#FFCADC']
    let defaultColor = '#4b4b4b';
    let pulsationInterval;

    generateWorld(boardSize)
            board.addEventListener('pointerover', (e) => {
                let target = e.target;
                if (!target.classList.contains('square')) return;
                setColor(target);

                target.addEventListener('pointerleave', (e) => {
                    if (!target.classList.contains('constant')) {
                        removeColor(target, defaultColor);
                    }

                })

                
            })

            board.addEventListener('click', (e) => {
                let target = e.target;
                if (!target.classList.contains('square')) return;
                if (document.querySelector('.pulsation').checked) {
                    pulsationInterval = setInterval(() => {
                        setColor(target)
                        setTimeout(() => {
                            removeColor(target, defaultColor)
                        }, 500)
                        // removeColor(target, defaultColor)
                    }, 1300);
                }
                target.classList.toggle('constant')
                setColor(target)
                if (!target.classList.contains('constant')) {
                    removeColor(target)
                }
            })
            // обработка действий с элементами
            // for (let square of document.querySelectorAll('.square')) {
            //     square.addEventListener('pointerover', () => {
            //         setColor(square);
            //     })

            //     square.addEventListener('pointerleave', (e) => {
            //         if (!e.target.classList.contains('constant')) {
            //             removeColor(square, defaultColor);
            //         }
                    
            //     })

            //     square.addEventListener('click', (e) => {
            //         e.preventDefault()
            //         e.target.classList.toggle('constant')
            //         setColor(e.target)
            //         if (!e.target.classList.contains('constant')) {
            //             removeColor(e.target)
            //         }
            //     })
            // }

    // закрашивание
    function setColor(element) {
        let color = getRandomColor();
        element.style.transition = 'none'
        element.style.background = color;
        element.style.boxShadow = `0 0 4px ${color}, 0 0 5px ${color}`
    }

    // удаление цвета
    function removeColor(element, defaultColor) {
        element.style.transition = '2s ease';
        element.style.background = defaultColor;
        element.style.boxShadow = `0 0 2px #000`
    }

    // рандомный цвет
    function getRandomColor() {
        let index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    document.querySelector('.settings').addEventListener('input', (e) => {
        switch(e.target.getAttribute('data-input')) {
            case 'borderRadius': 
                if (e.target.value < 0) e.target.value = 0;
                for (let elem of document.querySelectorAll('.square')) {
                    elem.style.borderRadius = `${e.target.value}px`
                }
                break;
            case 'boardSize': 
                boardSize = e.target.value;
                board.innerHTML = '';
                generateWorld(boardSize);
                break;
        }
    })
    

    // обработка кнопок
    document.querySelector('.buttons').addEventListener('click', (e) => {
        if (!e.target.hasAttribute('data-action')) return;
        e.preventDefault()
        switch(e.target.getAttribute('data-action')) {
            case 'clear':     
                for (let elem of document.querySelectorAll('.square')) {
                // for (pulsationInterval; pulsationInterval) {
                //     clearInterval(pulsationInterval)
                // }
                // alert(pulsationInterval)
                elem.classList.remove('constant')
                removeColor(elem, defaultColor)
            }
            break;
            // case 'paint': 
            //     for (let i = 0; i < document.querySelectorAll('.square').length; i++) {
            //         setTimeout(() => {
            //             document.querySelectorAll('.square')[i].classList.add('constant')
            //         setColor(document.querySelectorAll('.square')[i], defaultColor)
            //         }, 100)
            //     }
                // for (let elem of document.querySelectorAll('.square')) {
                //     setTimeout(() => {
                //         elem.classList.add('constant')
                //         setColor(elem, defaultColor)
                //     }, 0)
                // }
        }
    })

}

function generateWorld(size) {
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let elemIndex = 0; elemIndex < size; elemIndex++) {
            let square = document.createElement('div');
            square.classList.add('square')
            row.append(square)
        }

        board.append(row)
    }
}

game()


