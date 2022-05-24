const NUMBER_OF_PASSWORDS = 24
const ASCII_MIN_VALUE = 32
const ASCII_MAX_VALUE = 126 
const ASCII_RANGE = ASCII_MAX_VALUE - ASCII_MIN_VALUE + 1

function buildHTML() {
    const introContainer = document.createElement('div')
    introContainer.className = 'introContainer'
    document.body.appendChild(introContainer)

    const textPartOne = document.createElement('h1')
    textPartOne.textContent = 'Generate'

    const textPartTwo = document.createElement('h1')
    textPartTwo.textContent = 'a random password'
    textPartTwo.className = 'secondText'

    const textPartThree = document.createElement('p')
    textPartThree.textContent = 'never use an insecure password again'

    introContainer.appendChild(textPartOne)
    introContainer.appendChild(textPartTwo)
    introContainer.appendChild(textPartThree)

    const inputContainer = document.createElement('div')
    inputContainer.className = 'inputContainer'
    document.body.appendChild(inputContainer)

    const generateButton = document.createElement('button')
    generateButton.textContent = 'Generate'
    generateButton.className = 'generateButton'
    generateButton.onclick = generate
    inputContainer.appendChild(generateButton)

    const inputLabel = document.createElement('p')
    inputLabel.textContent = 'Password length '
    inputContainer.appendChild(inputLabel)

    const lengthInput = document.createElement('input')
    lengthInput.type = 'number'
    lengthInput.min = 5
    lengthInput.max = 20
    lengthInput.id ='inputLengthId'
    lengthInput.defaultValue = lengthInput.min
    inputContainer.appendChild(lengthInput)

    const separator = document.createElement('hr')
    document.body.appendChild(separator)

    const passwordsContainer = document.createElement('div')
    passwordsContainer.id = 'passwordsContainer'
    document.body.appendChild(passwordsContainer)
}

function generate() {
    const passwordsContainerElement = document.getElementById('passwordsContainer')
    cleanup(passwordsContainerElement)
    const passwordLength = +document.getElementById('inputLengthId').value
    const passwordLengthMin = +document.getElementById('inputLengthId').min
    const passwordLengthMax = +document.getElementById('inputLengthId').max

    if (passwordLength < passwordLengthMin) {
        alert('Password length too short')
    } else if (passwordLength > passwordLengthMax) {
        alert('Password length too long')
    } else {
        for (let index = 0; index < NUMBER_OF_PASSWORDS; index++) {
            createPasswordContainer(generatePasswordString(Math.floor(passwordLength)), passwordsContainerElement)
        }
    }
}

function createPasswordContainer(password, passwordsContainerElement) {
    const passContainer = document.createElement('button')
    passContainer.className = 'passwordContainer'
    passContainer.textContent = password
    passContainer.onclick = () => copyPassword(passContainer)
    passwordsContainerElement.appendChild(passContainer)
}

function generatePasswordString(passwordLength) {
    let password = ''
    for (let index = 0; index < passwordLength; index++) {
        const randomChar = Math.floor(Math.random() * ASCII_RANGE) + ASCII_MIN_VALUE
        password += String.fromCharCode(randomChar)
    }
    return password
}

function copyPassword(passContainer) {
    navigator.clipboard.writeText(passContainer.textContent)
    alert("Copied password: " + passContainer.textContent)
}

function cleanup(passwordsContainerElement) {
    for (let index = passwordsContainerElement.children.length - 1; index >= 0; index--) {
        passwordsContainerElement.children[index].remove()
    }
}

buildHTML()
