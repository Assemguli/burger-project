const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const switchActiveClassSideMenu = menuItemIndex => {
    $('.fixed-menu__item')
        .eq(menuItemIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');
}

const performTransition = sectionEq => {

    if (inscroll == false) {


        inscroll = true;
        const position = `${sectionEq * -100}%`;

        sections
            .eq(sectionEq)
            .addClass('active')
            .siblings()
            .removeClass('active');

        display.css({
            transform: `translateY(${position})`
        });

        setTimeout(() => {
            switchActiveClassSideMenu(sectionEq)
            inscroll = false;
        }, 1300);
    }
};

const scrollToSection = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }

    if (direction == 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
};


$('.wrapper').on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;


    if (deltaY > 0) {
        scrollToSection('next');
    }
    if (deltaY < 0) {
        scrollToSection('prev');
    }
});

$('.wrapper').on('touchmove', e => {
    e.preventDefault();
});

$(document).on('keydown', e => {
    switch (e.keyCode) {
        case 38:
            scrollToSection('prev');
            break;
        case 40:
            scrollToSection('next');
            break;
    }
})

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const targer = $(e.currentTarget).attr('data-scroll-to');

    performTransition(targer);
});


if (isMobile) {
    $(window).swipe({
        swipe: function (
            event,
            direction,
            distance,
            duration,
            fingerCount,
            fingerData
        ) {
            const nextOrPrev = direction == 'up' ? 'next' : 'prev';
            scrollToSection(nextOrPrev);
        }
    });
}

