
$(function () {
    var $content = $('#jsonContent');
    var fallbackMarkup = '<p class="medium-status">Recent articles are available on <a href="https://medium.com/@mcozar" target="_blank" rel="noopener noreferrer">Medium</a>.</p>';

    function isSafeUrl(value) {
        try {
            var url = new URL(value);
            return url.protocol === 'https:' || url.protocol === 'http:';
        } catch (error) {
            return false;
        }
    }

    function getImageUrl(item) {
        if (isSafeUrl(item.thumbnail)) {
            return item.thumbnail;
        }

        return $('<div>').html(item.description || '').find('img').first().attr('src');
    }

    function renderArticles(items) {
        $content.attr('aria-busy', 'false').empty();

        items.slice(0, 4).forEach(function (item) {
            if (!item || !isSafeUrl(item.link)) {
                return;
            }

            var $card = $('<article>', { class: 'card' });
            var $articleLink = $('<a>', {
                href: item.link,
                target: '_blank',
                rel: 'noopener noreferrer',
                class: 'medium-card-link'
            });
            var imageUrl = getImageUrl(item);
            var $media = $('<div>', { class: 'medium-card-media' });

            if (isSafeUrl(imageUrl)) {
                $media.append($('<img>', {
                    src: imageUrl,
                    alt: '',
                    class: 'card-img-top'
                }));
            }

            $articleLink.append($media);
            $articleLink.append($('<div>', { class: 'card-body' })
                .append($('<p>', { class: 'medium-card-label', text: 'Medium' }))
                .append($('<h3>', { class: 'card-title', text: item.title || 'Read article' }))
                .append($('<span>', { class: 'medium-card-action', text: 'Read article' })));
            $card.append($articleLink);
            $content.append($card);
        });

        if (!$content.children().length) {
            $content.html(fallbackMarkup);
        }
    }

    $.getJSON('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mcozar')
        .done(function (response) {
            if (response && response.status === 'ok' && Array.isArray(response.items)) {
                renderArticles(response.items);
                return;
            }

            $content.attr('aria-busy', 'false').html(fallbackMarkup);
        })
        .fail(function () {
            $content.attr('aria-busy', 'false').html(fallbackMarkup);
        });
});