angular.module('app')
    .directive('dragMe', ['$document', function($document) {
        return {
            link: function(scope, element, attr) {
                var startX = 0, startY = 0, x = attr.left || 0, y = attr.top || 0;
                var containerWidth = 780,
                    containerHeight = 215;
                var wallWidth = 664;
                var top = attr.top || 0, left = attr.left || 0;

                var elWidth = element[0].offsetWidth,
                elHeight = element[0].offsetHeight;

                element.css({
                    position: 'absolute',
                    cursor: 'pointer'
                });

                element.css({
                    top: top + 'px',
                    left: left + 'px'
                });

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {

                    x = event.pageX - startX;

                    if (x >= containerWidth-elWidth) x = containerWidth-elWidth;
                    if (x <= 0) x = 0;

                    //TODO: keep no limits for Y-axis?
                    switch (attr.id) {
                        case 'wallpaper':
                            elWidth = element[0].offsetWidth;
                            if (x >= wallWidth-elWidth) x = wallWidth-elWidth;
                            break;
                        case 'door':
                            if (x >= wallWidth-elWidth) x = wallWidth-elWidth;
                            break;
                        default:
                            y = event.pageY - startY;

                            if (y <= -50) y = -50;
                            if (y >= containerHeight-elHeight + 50 ) y = containerHeight-elHeight + 50;
                            element.css({
                                top: y + 'px'
                            });
                    }

                    element.css({
                        left:  x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }
        };
    }]);