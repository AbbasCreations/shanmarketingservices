/**
* Template Name: Selecao - v4.3.0
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

$(function() {
  $('.material-card > .mc-btn-action').click(function () {
      var card = $(this).parent('.material-card');
      var icon = $(this).children('i');
      icon.addClass('fa-spin-fast');

      if (card.hasClass('mc-active')) {
          card.removeClass('mc-active');

          window.setTimeout(function() {
              icon
                  .removeClass('fa-arrow-left')
                  .removeClass('fa-spin-fast')
                  .addClass('fa-bars');

          }, 800);
      } else {
          card.addClass('mc-active');

          window.setTimeout(function() {
              icon
                  .removeClass('fa-bars')
                  .removeClass('fa-spin-fast')
                  .addClass('fa-arrow-left');

          }, 800);
      }
  });
});




const persons = [
  {
    name: "Syed Altaf Zaidi",
    photo: "https://abbascreations.github.io/shanmarketingservices/assets/img/images/ceo.jpg",
    title: "Founder & CEO",
    bio:
      "<p>Welcome to Shan Marketing Services! As you navigate through our website, I hope you learn more about the qualities that make our company an outstanding provider of distribution services and a wonderful place to build a career. With over 25 years of experience in the distribution industry, we have earned the trust and respect of multinational companies such as Nestle, Pepsi-Cola, Seasons Oil to name a few. Our progressive thinking and distinct approach towards our customers and partners prepare us to hit our targets monthly. Furthermore, we value our corporate responsibility and our reputation for corporate integrity attracts great team members, customers, and even greater opportunities. This notion is vital to our long-term success. I am proud of the work we, as a company, do and I can assure you that we will continue to deliver what we promise with complete dedication and commitment.We wish you the best and enjoy our website. Should you have any questions, feel free to contact our local office for any additional information.</p>",
    social: {
      facebook: "#",
      twitter: "https://twitter.com/",
      linkedin: "#"
    }
  },
  {
    name: "Syed Wajih Zaidi",
    photo: "https://abbascreations.github.io/shanmarketingservices/assets/img/images/team1.jpeg",
    title: "Director",
    bio:
      "<p>Welcome to Shan Marketing Services! As you navigate through our website, I hope you learn more about the qualities that make our company an outstanding provider of distribution services and a wonderful place to build a career. With over 25 years of experience in the distribution industry, we have earned the trust and respect of multinational companies such as Nestle, Pepsi-Cola, Seasons Oil to name a few. Our progressive thinking and distinct approach towards our customers and partners prepare us to hit our targets monthly. Furthermore, we value our corporate responsibility and our reputation for corporate integrity attracts great team members, customers, and even greater opportunities. This notion is vital to our long-term success. I am proud of the work we, as a company, do and I can assure you that we will continue to deliver what we promise with complete dedication and commitment.We wish you the best and enjoy our website. Should you have any questions, feel free to contact our local office for any additional information.</p>",
    social: {
      facebook: "#",
      twitter: "https://twitter.com/",
      linkedin: "#"
    }
  },
  {
    name: "Syed Mohsin Zaidi",
    photo: "https://abbascreations.github.io/shanmarketingservices/assets/img/images/anotherteammember.jpg",
    title: "Director",
    bio:
      "<p>Welcome to Shan Marketing Services! As you navigate through our website, I hope you learn more about the qualities that make our company an outstanding provider of distribution services and a wonderful place to build a career. With over 25 years of experience in the distribution industry, we have earned the trust and respect of multinational companies such as Nestle, Pepsi-Cola, Seasons Oil to name a few. Our progressive thinking and distinct approach towards our customers and partners prepare us to hit our targets monthly. Furthermore, we value our corporate responsibility and our reputation for corporate integrity attracts great team members, customers, and even greater opportunities. This notion is vital to our long-term success. I am proud of the work we, as a company, do and I can assure you that we will continue to deliver what we promise with complete dedication and commitment.We wish you the best and enjoy our website. Should you have any questions, feel free to contact our local office for any additional information.</p>",
    social: {
      facebook: "#",
      twitter: "https://twitter.com/",
      linkedin: "#"
    }
  },
  {
    name: "Zeeshan Siddique",
    photo: "https://abbascreations.github.io/shanmarketingservices/assets/img/images/team2.jpeg",
    title: "Manager Finance",
    bio:
      "<p>Welcome to Shan Marketing Services! As you navigate through our website, I hope you learn more about the qualities that make our company an outstanding provider of distribution services and a wonderful place to build a career. With over 25 years of experience in the distribution industry, we have earned the trust and respect of multinational companies such as Nestle, Pepsi-Cola, Seasons Oil to name a few. Our progressive thinking and distinct approach towards our customers and partners prepare us to hit our targets monthly. Furthermore, we value our corporate responsibility and our reputation for corporate integrity attracts great team members, customers, and even greater opportunities. This notion is vital to our long-term success. I am proud of the work we, as a company, do and I can assure you that we will continue to deliver what we promise with complete dedication and commitment.We wish you the best and enjoy our website. Should you have any questions, feel free to contact our local office for any additional information.</p>",
    social: {
      facebook: "#",
      twitter: "https://twitter.com/",
      linkedin: "#"
    }
  }
];

const app = new Vue({
  el: "#app",
  data() {
    return {
      persons: persons,
      selectedPersonIndex: null,
      isSelected: false,
      selectedPerson: null,
      inlineStyles: null,
      isReady: false,
      isOk: false,
      selectedPersonData: {
        name: null,
        title: null,
        photo: null,
        social: {
          facebook: null,
          twitter: null,
          linkedin: null
        }
      }
    };
  },
  methods: {
    selectPerson(index, el) {
      if (!this.isOk) {
        this.selectedPersonIndex = index;
        this.isSelected = true;
        el.target.parentElement.className == "person-details"
          ? (this.selectedPerson = el.target.parentElement.parentElement)
          : (this.selectedPerson = el.target.parentElement);

        this.selectedPerson.classList.add("person-selected");
        this.selectedPerson.setAttribute(
          "style",
          `width:${this.selectedPerson.offsetWidth}px;`
        );
        this.selectedPersonData = this.persons[index];
        window.setTimeout(() => {
          this.inlineStyles = `width:${this.selectedPerson
            .offsetWidth}px;height:${this.selectedPerson
            .offsetHeight}px;left:${this.selectedPerson.offsetLeft}px;top:${this
            .selectedPerson.offsetTop}px;position:fixed`;
          this.selectedPerson.setAttribute("style", this.inlineStyles);
        }, 400);
        window.setTimeout(() => {
          this.isReady = true;
          this.isOk = true;
        }, 420);
      } else {
        this.reset();
      }
    },
    reset() {
      this.isReady = false;
      window.setTimeout(() => {
        this.selectedPerson.classList.add("person-back");
      }, 280);
      window.setTimeout(() => {
        this.selectedPerson.setAttribute("style", "");
      }, 340);
      window.setTimeout(() => {
        this.isSelected = false;
        this.selectedPerson.classList.remove("person-back", "person-selected");
        this.isOk = false;
      }, 400);
    }
  }
});
