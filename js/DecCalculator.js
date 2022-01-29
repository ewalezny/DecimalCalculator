import Calculator from "./Calculator";

class DecCalculator extends Calculator {
    /**
     * Method add numbers in two array
     */
    add(numberX, numberY) {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = numberX.length - 1; i >= 0; i--) {
            let sum = numberX[i] + numberY[i] + result[i];
            if (sum >= 10) {
                result[i] = sum - 10;
                result[i - 1] = 1;
            } else {
                result[i] = sum;
            }
        }
        return result;
    }

    /**
     * Method changing number
     */
    changeNumber(parentElement) {
        const input = parentElement.firstElementChild;
        input.contentEditable = true;
        input.focus();
    }

    checkNumber() {
        super.checkNumber();

        return [...this.firstNumberArray, ...this.secondNumberArray].every(el => {
            return typeof el === "number" && el < 10 && el >= 0;
        })
    }

    /**
     * Set event click on +
     */
    initEvents() {
        super.initEvents();

        this.$calculatorDOMElement.querySelector(".operator-bar").addEventListener("click", () => {
            const checkNumbers = this.checkNumber();
            if (checkNumbers) {
                this.updateResult();
            }
        });
    }
}

export default DecCalculator;