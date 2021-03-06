class Dom {
    constructor(selector) {
        this.$el = typeof (selector) === 'string' ?
            document.querySelector(selector) :
            selector
    }

    get data() {
        return this.$el.dataset
    }

    get text() {
        if (this.$el.tagName !== 'INPUT') {
            return this.$el.textContent.trim()
        }
        return this.$el.value.trim()
    }

    get element() {
        return this.$el
    }

    set text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
        } else {
            throw new Error(`the passed value: ${text} is not a string`)
        }
    }

    attr(name, value = '') {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    html(html) {
        if (typeof (html) === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoord() {
        return this.$el.getBoundingClientRect()
    }

    getComputedStyle(style) {
        const element = window.getComputedStyle(this.$el)
        return element.getPropertyValue(style)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    getStyles(styles = []) {
        return styles.reduce((total, value) => {
            total[value] = this.$el.style[value]
            return total
        }, {})
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    focus() {
        this.$el.focus()
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if (className) {
        el.classList.add(className)
    }

    return $(el)
}