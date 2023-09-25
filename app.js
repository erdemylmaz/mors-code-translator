const input = document.querySelector('.input');
const outputTextArea = document.querySelector('.output-text');

const typeText = document.querySelector('.type-text');
const changeTypeBtn = document.querySelector('.change-type-btn');

const copyBtn = document.querySelector('.output-copy-btn');
const copyModal = document.querySelector('.copy-modal');

class App {
    letters = [
        {
            letter: 'A',
            code: '.-',
        },
        {
            letter: 'B',
            code: '-...',
        },
        {
            letter: 'C',
            code: '-.-.',
        },
        {
            letter: 'D',
            code: '-..',
        },
        {
            letter: 'E',
            code: '.',
        },
        {
            letter: 'F',
            code: '..-.',
        },
        {
            letter: 'G',
            code: '--.',
        },
        {
            letter: 'H',
            code: '....',
        },
        {
            letter: 'I',
            code: '..',
        },
        {
            letter: 'J',
            code: '.---',
        },
        {
            letter: 'K',
            code: '-.-',
        },
        {
            letter: 'L',
            code: '.-..',
        },
        {
            letter: 'M',
            code: '--',
        },
        {
            letter: 'N',
            code: '-.',
        },
        {
            letter: 'O',
            code: '---',
        },
        {
            letter: 'P',
            code: '.--.',
        },
        {
            letter: 'Q',
            code: '--.-',
        },
        {
            letter: 'R',
            code: '.-.',
        },
        {
            letter: 'S',
            code: '...',
        },
        {
            letter: 'T',
            code: '-',
        },
        {
            letter: 'U',
            code: '..-',
        },
        {
            letter: 'V',
            code: '...-',
        },
        {
            letter: 'W',
            code: '.--',
        },
        {
            letter: 'X',
            code: '-..-',
        },
        {
            letter: 'Y',
            code: '-.--',
        },
        {
            letter: 'Z',
            code: '--..',
        },
        {
            letter: '1',
            code: '.----',
        },
        {
            letter: '2',
            code: '..---',
        },
        {
            letter: '3',
            code: '...--',
        },
        {
            letter: '4',
            code: '....-',
        },
        {
            letter: '5',
            code: '.....',
        },
        {
            letter: '6',
            code: '-....',
        },
        {
            letter: '7',
            code: '--...',
        },
        {
            letter: '8',
            code: '---..',
        },
        {
            letter: '9',
            code: '----.',
        },
        {
            letter: '0',
            code: '-----',
        },
        {
            letter: '.',
            code: '.-.-.-',
        },
        {
            letter: "'",
            code: '.----.',
        },
        {
            letter: '(',
            code: '-.--.',
        },
        {
            letter: ':',
            code: '---...',
        },
        {
            letter: '+',
            code: '.-.-.',
        },
        {
            letter: '"',
            code: '.-..-.',
        },
        {
            letter: '¿',
            code: '..-.-',
        },
        {
            letter: ',',
            code: '--..--',
        },
        {
            letter: '!',
            code: '-.-.--',
        },
        {
            letter: ')',
            code: '-.--.-',
        },
        {
            letter: ';',
            code: '-.-.-.',
        },
        {
            letter: '-',
            code: '-....-',
        },
        {
            letter: '$',
            code: '...-..-',
        },
        {
            letter: '?',
            code: '..--..',
        },
        {
            letter: '/',
            code: '-..-.',
        },
        {
            letter: '&',
            code: '.-...',
        },
        {
            letter: '=',
            code: '-...-',
        },
        {
            letter: '_',
            code: '..--.-',
        },
        {
            letter: '@',
            code: '.--.-.',
        },
        {
            letter: '',
            code: '',
        },
    ];

    type = 1; // 0 for Mors to Text, 1 for Text to Mors
    output = "";

    onTyping = () => {
        let value = input.value;
        
        let words = value.split(" ");

        let outputWords = [];
        let newCode = "";

        if(app.type == 1) {
            for(let i = 0, textLength = value.length; i < textLength; i++) {
                for(let x = 0, length = this.letters.length; x < length; x++) {
                    if(value[i].toUpperCase() == this.letters[x].letter) {
                        newCode += this.letters[x].code + " ";
                    }

                }

                if(value[i] == " ") {
                    newCode += " / ";
                }
            }

            outputWords.push(newCode);
        } else {
            let lastChar = value[value.length - 1];

            if(lastChar != '.' && lastChar != "-" && lastChar != ' ' && lastChar != '/') {
                input.style.animation = "falseAnimation .125s infinite";
                input.style.borderColor = "var(--mitLightRed)";

                setTimeout(() => {
                    input.style.animation = "none";
                    input.style.borderColor = "var(--mitGray)";
                }, 500);
            }


            words.map((word) => {
                let newWord = "";

                if(this.type == 0) {
                    for(let x = 0, length = this.letters.length; x < length; x++) {
                            if(word == this.letters[x].code) {
                                newWord += this.letters[x].letter;
                            }

                            if(word == "/") {
                                newWord = " ";
                            }
                    }
                } else {
                    
                }

                outputWords.push(newWord)
            });
        }

        this.output = "";

        outputWords.map((word) => {
            this.output += word;
        });

        outputTextArea.textContent = this.output;

    }

    copy = () => {


        navigator.clipboard.writeText(this.output);


        copyModal.style.display = "flex";

        setTimeout(() => {
            copyModal.style.display = "none";
        }, 2000);

    }
}

const app = new App();

input.addEventListener('keyup', app.onTyping);

changeTypeBtn.addEventListener('click', () => {
    if(app.type == 0) {
        app.type = 1;
        typeText.textContent = "Text to Mors";
        input.placeholder = "Type your text here..."
    } else {
        app.type = 0;
        typeText.textContent = "Mors to Text";
        input.placeholder = "Use '.' for short & '-' for long & '/' for space"
    }

    input.value = "";
    outputTextArea.textContent = "";
});

copyBtn.addEventListener('click', app.copy);