const NUMBER_OF_PASSWORDS = 24
const ASCII_MIN_VALUE = 32
const ASCII_MAX_VALUE = 126 
const ASCII_RANGE = ASCII_MAX_VALUE - ASCII_MIN_VALUE + 1
const passwordsContainerElement = document.getElementById('passwordsContainer')

function generate() {
    cleanup()
    const passwordLength = +document.getElementById('inputLengthId').value
    const passwordLengthMin = +document.getElementById('inputLengthId').min
    const passwordLengthMax = +document.getElementById('inputLengthId').max

    if (passwordLength < passwordLengthMin) {
        alert('Password length too short')
    } else if (passwordLength > passwordLengthMax) {
        alert('Password length too long')
    } else {
        for (let index = 0; index < NUMBER_OF_PASSWORDS; index++) {
            createPasswordContainer(generatePasswordString(Math.floor(passwordLength)))
        }
    }
}

function createPasswordContainer(password) {
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

function cleanup() {
    for (let index = passwordsContainerElement.children.length - 1; index >= 0; index--) {
        passwordsContainerElement.children[index].remove()
    }
}
