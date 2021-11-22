$(() => {
    $('#nav-bar-button').on('click', () => {
        $('#nav-bar').toggleClass('active');
    })

    const sections = [$('#home-page')[0], $('#about-page')[0], $('#projects-page')[0], $('#contact-page')[0]];
    var currentSection = sections[0];

    $(document).scroll(() => {
        sections.forEach(section => {
            if ($(section).position().top <= $(document).scrollTop() &&
                ($(section).position().top + $(section).outerHeight()) > $(document).scrollTop()) {
                if (currentSection != section) {
                    currentSection = section;
                }
            }
        });
    });

    $('#next-button').on('click', () => {
        let nextIndex = sections.indexOf(currentSection) + 1;
        if (nextIndex > 3) return;
        $('html,body').animate({
            scrollTop: $(sections[nextIndex]).offset().top
        }, 0);
    });

    $('#previous-button').on('click', () => {
        let previousIndex = sections.indexOf(currentSection) - 1;
        if (previousIndex < 0) return;
        $('html,body').animate({
            scrollTop: $(sections[previousIndex]).offset().top
        }, 0);
    });
});