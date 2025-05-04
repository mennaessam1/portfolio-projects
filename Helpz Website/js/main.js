

(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    
    // Main carousel
    $(".carousel .owl-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 300,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });
    
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Causes carousel
    $(".causes-carousel").owlCarousel({
        autoplay: true,
        animateIn: 'slideInDown',
        animateOut: 'slideOutDown',
        items: 1,
        smartSpeed: 450,
        dots: false,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Login functionality
    document.addEventListener('DOMContentLoaded', function() {
        var loginForm = document.querySelector('.donate-form form');
        var usernameInput = document.querySelector('.donate-form input[type="text"]');
        var passwordInput = document.querySelector('.donate-form input[type="password"]');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var username = usernameInput.value;
            var password = passwordInput.value;

            var hardcodedUsername = 'admin';
            var hardcodedPassword = 'password';

            if (username === 'admin' && password === 'password') {
                sessionStorage.setItem('person', 'admin'); 
                sessionStorage.setItem('adore', 'admin');  
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'admin profile.html'; // Replace 'dashboard.html' with your desired destination
            }
            else if (username === 'regDonor' && password === 'password') {
                sessionStorage.setItem('visitor', 'donor');
                sessionStorage.setItem('viewer', 'regdonor');
                sessionStorage.setItem('person', 'regdonor');
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'single.html'; // Replace 'dashboard.html' with your desired destination
            }
            else if (username === 'techDonor' && password === 'password') {
                sessionStorage.setItem('visitor', 'donor');
                sessionStorage.setItem('viewer', 'techdonor');
                sessionStorage.setItem('person', 'techdonor');
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'singletech.html'; // Replace 'dashboard.html' with your desired destination
            }
            else if (username === 'docDonor' && password === 'password') {
                sessionStorage.setItem('visitor', 'donor');
                sessionStorage.setItem('viewer', 'docdonor');
                sessionStorage.setItem('person', 'docdonor');
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'singleDoc.html'; // Replace 'dashboard.html' with your desired destination
            }
            else if (username === 'org' && password === 'password') {
                sessionStorage.setItem('adore', 'organization');
                sessionStorage.setItem('visitor', 'org');   
                sessionStorage.setItem('viewer', 'organization');
                alert('Login Successful! Redirecting to Dashboard...');
                window.location.href = 'singleOrg.html'; // Replace 'dashboard.html' with your desired destination
            }
            else {
                alert('Invalid username or password. Please try again.');
            }
        }
    
    );

    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     var volunteerForm = document.getElementById('volunteerForm'); // Select the volunteer form element
    //     var joinCommunityButton = document.getElementById('joinCommunityButton'); // Select the join community button
    
    //     joinCommunityButton.addEventListener('click', function(event) { // Listen for the click event on the join community button
    //         event.preventDefault(); // Prevent the default button behavior
    
    //         // Perform validation for required fields
    //         var fname = document.getElementById('fname').value;
    //         var lname = document.getElementById('lname').value;
    //         var email = document.getElementById('email').value;
    //         var contactnumber = document.getElementById('contactnumber').value;
    //         var password = document.getElementById('password').value;
    
    //         if (!fname || !lname || !email || !contactnumber || !password) {
    //             alert('Please fill in all required fields.');
    //             return; // Stop further execution if any required field is empty
    //         }
    
    //         // If all required fields are filled, proceed with joining the community
    //         // Display a popup alert
    //         alert('Thank you for joining our community! Redirecting to Homepage...');
    
    //         // Redirect to index.html after a short delay (e.g., 2 seconds)
    //         setTimeout(function() {
    //             window.location.href = 'index.html';
    //         }, 700); // Adjust the delay time as needed (in milliseconds)
    //     });
    // });
    
    
  
    /*
// Initialize and add the map
function initMap() {
    // The location of the map's center
    const center = { lat: -25.344, lng: 131.031 };

    // Create a new map instance and center it at the specified position
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4, // Adjust the initial zoom level as needed
        center: center,
        mapId: "map", // Replace "YOUR_MAP_ID" with your actual map ID
    });

    // Add a marker to the map at the specified position
    const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: "Uluru", // Marker title
    });
}

// Call the initMap function when the page loads
initMap();
*/



    
})(jQuery);

