/*

 This is a variation of the Markov text generator adapted to the needs of Garfield strips.

 - it recognizes ^ and $ as characters enclosing the contents of a speech bubble
 - it always starts generating text from ^, and stops generating at $
 - it recognizes words preceded by an asterisk (*) as emphasized and surrounds them with <em> tags

 For a more general-purpose Markov text generator, see Markov.js in this directory.

 */


function TextGenerator(sourceText, order) {

    this.sourceText = sourceText;
    this.order = order;

    this.LINE_START = '^';
    this.LINE_END = '$';


    this._setupFrequencies();

}

TextGenerator.prototype = {

    _setupFrequencies: function () {

        this.frequencies = {};
        this.startingChunks = [];

        // for each substring of length <order>,
        // create an array of characters that can follow it
        for (var i = 0; i < this.sourceText.length - (this.order - 1); i++) {
            var chunk = this.sourceText.substr(i, this.order);
            if (!this.frequencies.hasOwnProperty(chunk)) {
                this.frequencies[chunk] = [];
            }
            var follower = this.sourceText.substr(i + this.order, 1);
            this.frequencies[chunk].push(follower);

            if (chunk.charAt(0) === this.LINE_START) {
                this.startingChunks.push(chunk);
            }

        }

    },

    _getRandomChar: function (chunk) {

        if (!this.frequencies.hasOwnProperty(chunk)) {
            return '';
        }
        var followers = this.frequencies[chunk];
        var randIndex = Math.floor(Math.random() * followers.length);
        return followers[randIndex];

    },

    _getRandomStartingChunk: function () {

        var randIndex = Math.floor(Math.random() * this.startingChunks.length);
        return this.startingChunks[randIndex];

    },

    _format: function (text) {

        // remove line start character
        text = text.substr(1);

        // make sure all line end characters are removed
        // (necessary when $ occurs in the first chunk)
        var n = text.indexOf(this.LINE_END);
        text = text.substring(0, n != -1 ? n : text.length);

        // italicize words preceded by an asterisk
        text = text.replace(/\*([^\s]+)(\b)/gi, '<em>$1</em>$2');

        return text;

    },

    generateText: function (length) {

        if (this.sourceText.length <= this.order) {
            return '';
        }

        var text = this._getRandomStartingChunk();

        // take the last <order> characters from the generated string,
        // select one of its possible followers, and append it
        for (var i = this.order; i < length; i++) {
            var currentChunk = text.substr(text.length - this.order);
            var newChar = this._getRandomChar(currentChunk);

            if (newChar == this.LINE_END) {
                break;
            } else {
                text += newChar;
            }
        }

        text = this._format(text);
        return text;

    }

}