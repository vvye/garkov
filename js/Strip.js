/**
 * Created by Eric on 29.01.2015.
 */

function Strip(imagePath, bubbles) {

    this.imagePath = imagePath;
    this.bubbles = bubbles;

}

Strip.prototype = {

    generateBubbleText: function (bubble) {

        if (bubble.jon) {
            return jonGarkov.generateText(bubble.maxLength);
        } else {
            return garfieldGarkov.generateText(bubble.maxLength);
        }

    },

    _renderBubble: function (bubble) {

        var container = document.createElement('div');
        container.className = 'bubble-container';
        container.style.top = bubble.top + 'px';
        container.style.left = bubble.left + 'px';
        container.style.width = bubble.width + 'px';
        container.style.height = bubble.height + 'px';

        var table = document.createElement('div');
        table.className = 'bubble-table';

        var cell = document.createElement('div');
        cell.className = 'bubble-text';
        cell.innerHTML = this.generateBubbleText(bubble);

        table.appendChild(cell);
        container.appendChild(table);
        document.getElementById('strip-container').appendChild(container);

    },

    _renderBubbles: function () {

        for (var i = 0; i < this.bubbles.length; i++) {
            var bubble = this.bubbles[i];
            this._renderBubble(bubble);
        }

    },

    render: function () {

        var container = document.getElementById('strip-container');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var image = document.createElement('img');
        image.className = 'strip';
        image.src = this.imagePath;

        container.appendChild(image);

        this._renderBubbles();

    }

};
