/**
 * Created by Eric on 27.01.2015.
 */

function Markov(sourceText, order) {

    this.sourceText = sourceText;
    this.order = order;

    this._setupFrequencies();

}

Markov.prototype = {

    _setupFrequencies: function() {

        this.frequencies = {};

        // for each substring of length <order>,
        // create an array of characters that can follow it
        for (var i = 0; i < this.sourceText.length - (this.order - 1); i++) {
            var chunk = this.sourceText.substr(i, this.order);
            if (!this.frequencies.hasOwnProperty(chunk)) {
                this.frequencies[chunk] = [];
            }
            var follower = this.sourceText.substr(i + this.order, 1);
            this.frequencies[chunk].push(follower);
        }

    },

    _getRandomChar: function(chunk) {

        if (!this.frequencies.hasOwnProperty(chunk)) {
            return '';
        }
        var followers = this.frequencies[chunk];
        var randIndex = Math.floor(Math.random() * followers.length);
        return followers[randIndex];

    },

    _getRandomChunk: function() {

        var randIndex = Math.floor(Math.random() * this.sourceText.length);
        return this.sourceText.substr(randIndex, this.order);

    },

    generateText: function(length) {

        if (this.sourceText.length <= this.order) {
            return '';
        }

        var text = this._getRandomChunk();

        // take the last <order> characters from the generated string,
        // select one of its possible followers, and append it
        for (var i = this.order; i < length; i++) {
            var currentChunk = text.substr(text.length - this.order);
            var newChar = this._getRandomChar(currentChunk);

            if (newChar != '') { // the last chunk of the source has no follower
                text += newChar;
            } else {
                text += this._getRandomChunk();
            }
        }

        return text;

    }

}