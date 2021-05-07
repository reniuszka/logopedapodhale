// to scroll from the btn to 1section, define btn and sec1 and add event listener, then define the behaviour athrough scrollIntoView
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--terapia');
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//scroling to secion using bubbling - event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //     console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//sticky nav
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  //destructing -> entries[0]
  const [entry] = entries;
  //inIntersecting is taken from console, if it is false we want to add the class sticky
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
//callback and the object of options
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//reveal sections

const allSections = document.querySelectorAll('.section');
//callback
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  //entry.target shows id to which sectionsit refers
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
