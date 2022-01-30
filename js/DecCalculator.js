import Calculator from "./Calculator";

class DecCalculator extends Calculator {
    constructor(selector) {
        super(selector);
        this.$tooltip = this.$calculatorDOMElement.querySelector(".popover");
    }

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
        this.input = parentElement.firstElementChild;
        this.input.contentEditable = true;
        this.input.focus();
        this.showTooltip("Naciśnij, aby dodać wartości.")
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

        this.$calculatorDOMElement.querySelector(".operator-bar").addEventListener("click", (event) => {
            this.hideTooltip();

            const checkNumbers = this.checkNumber();
            if (checkNumbers) {
                this.updateResult();
            } else {
                this.showTooltip("Wartości muszą być cyframi (0-9)")
            }
        });

        this.$calculatorDOMElement.querySelectorAll(".dec-calculator span").forEach(el => {
            el.addEventListener("blur", (event) => {
                    const checkNumbers = this.checkNumber();
                    if (!checkNumbers) {
                        event.target.innerText = 0;
                        event.target.contentEditable = false;
                        this.resultNumberArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                        this.showTooltip("Wartości muszą być cyframi (0-9)")
                    }
            })
        })
    }

    showTooltip(text) {
        this.$tooltip.querySelector(".popover-body").innerText = text;
        this.$tooltip.classList.add("show");
    }

    hideTooltip() {
        this.$tooltip.classList.remove("show");
    }
}

export default DecCalculator;