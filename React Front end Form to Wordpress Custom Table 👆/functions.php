<?php
if ( ! defined( '_JN_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_JN_VERSION', '1.0.0' );
}


if ( ! function_exists( 'myivi_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function myivi_theme_setup() {
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		// Logo support
        $defaults = array(
            'height'               => 100,
            'width'                => 400,
            'flex-height'          => true,
            'flex-width'           => true,
            'header-text'          => array( 'site-title', 'site-description' ),
            'unlink-homepage-logo' => false, 
        );

        add_theme_support( 'custom-logo', $defaults );

        /**
         * Enqueue scripts and styles.
         */

        function myivi_scripts() {
            // check if woocommerce is activated in website start
            $ifWooActivate = false;
            if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
                $ifWooActivate = true;
            } else {
                $ifWooActivate = false;
            }
            // check if woocommerce is activated in website end

            wp_enqueue_style( 'myivi-style', get_stylesheet_uri(), array(), _JN_VERSION );
            wp_enqueue_style( 'myivi-bootstrap-style', get_template_directory_uri() . '/assets/css/bootstrap/bootstrap.min.css',false, _JN_VERSION,'all');
            wp_enqueue_style( 'myivi-fontawesome-style', get_template_directory_uri() . '/assets/css/fontawesome/css/all.min.css',false, _JN_VERSION,'all');
            wp_enqueue_style( 'myivi-font-style', get_template_directory_uri() . '/assets/fonts/stylesheet.css',false, _JN_VERSION,'all');

            // owl and slick both are linked use one of them at once 
            wp_enqueue_style( 'myivi-owl-style', get_template_directory_uri() . '/assets/css/owl/owl.min.css',false, _JN_VERSION,'all');
            wp_enqueue_style( 'myivi-swiper-style', get_template_directory_uri() . '/assets/css/swiper/swiper.min.css',false, _JN_VERSION,'all');
            //wp_enqueue_style( 'myivi-slick-style', get_template_directory_uri() . '/assets/css/slick/slick.min.css',false, _JN_VERSION,'all');
            if($ifWooActivate){
                wp_enqueue_style( 'myivi-woocommerce-style', get_template_directory_uri() . '/assets/css/woocommerce/style.css',false, _JN_VERSION,'all');
            }
            wp_enqueue_style( 'myivi-theme-style', get_template_directory_uri() . '/assets/css/theme-style.css',false, _JN_VERSION,'all');

            wp_enqueue_script( 'myivi-jquery-script', get_template_directory_uri() . '/assets/js/jquery/jquery.min.js', array(), _JN_VERSION, true );
            wp_enqueue_script( 'myivi-bootstrap-script', get_template_directory_uri() . '/assets/js/bootstrap/bootstrap.bundle.min.js', array(), _JN_VERSION, true );

            // owl and slick both are linked use one of them at once  
            wp_enqueue_script( 'myivi-owl-script', get_template_directory_uri() . '/assets/js/owl/owl.min.js', array(), _JN_VERSION, true );
            wp_enqueue_script( 'myivi-swiper-script', get_template_directory_uri() . '/assets/js/swiper/swiper_bundle.min.js', array(), _JN_VERSION, true );
            //wp_enqueue_script( 'myivi-slick-script', get_template_directory_uri() . '/assets/js/slick/slick.min.js', array(), _JN_VERSION, true );
            wp_enqueue_script( 'myivi-theme-script', get_template_directory_uri() . '/assets/js/function.js', array(), _JN_VERSION, true );

        }
        add_action( 'wp_enqueue_scripts', 'myivi_scripts' );
        
        /* register_nav_menus( array(
			'header' => __( 'Primary Menu', 'myivi' ),
			'footer'  => __( 'Footer Menu', 'myivi' ),
		) ); */
        
        
        /* ------ Admin Login Page Design ------ */
        require get_template_directory() . '/inc/theme/login_p_design.php';

        /* ------ Revert To Classic Editor & Classic Widgets ------ */
        require get_template_directory() . '/inc/theme/c_editor_c_widgets.php';

        /* ------ Register Custom Menus ------ */
        require get_template_directory() . '/inc/theme/menus.php';

        /* ------ Register Customizer ------ */
        require get_template_directory() . '/inc/theme/customizer.php';

        /* ------ Register Widgets ------ */
        require get_template_directory() . '/inc/theme/widgets.php';

        /* ------ Allow SVG ------ */
        require get_template_directory() . '/inc/theme/allow_svg.php';

        
        // Remove <p> and <br/> from Contact Form 7  (Uncomment this filter if you use CF7)
        //add_filter('wpcf7_autop_or_not', '__return_false');
 
	}
endif;
add_action( 'after_setup_theme', 'myivi_theme_setup' );


// add_action( 'after_setup_theme', 'enable_woocommerce_support' );

// function enable_woocommerce_support() {
// 	add_theme_support( 'woocommerce' );
// }




        
function faq_shortcode_func( $atts ) {
    $attributes = shortcode_atts( array(
        // 'limit' => 4
    ), $atts );

    ob_start();

    // include template with the arguments
    get_template_part( 'inc/shortcodes/faq_section', null, array('attributes' => $attributes) );

    return ob_get_clean();
}
add_shortcode( 'faq_shortcode', 'faq_shortcode_func' );


function get_started_shortcode_func( $atts ) {
    $attributes = shortcode_atts( array(
        // 'limit' => 4
    ), $atts );

    ob_start();

    // include template with the arguments
    get_template_part( 'inc/shortcodes/get_started_section', null, array('attributes' => $attributes) );

    return ob_get_clean();
}
add_shortcode( 'get_started_shortcode', 'get_started_shortcode_func' );




// Remove content editor from posts and pages
add_action( 'init', function() {
    remove_post_type_support( 'post', 'editor' ); // Remove editor from posts
    remove_post_type_support( 'page', 'editor' ); // Remove editor from pages
}, 99);


// Here's an easier one-liner to set X-Frame-Options SAMEORIGIN OR DENY that works, add the following to the functions.php file in your current Wordpress theme:
add_action( 'send_headers', 'send_frame_options_header', 10, 0 );





/*******************************************************/
/*******************************************************/
/*******************************************************/
/*******************************************************/

global $wpdb;
$table_name = $wpdb->prefix . 'contact_entries'; // Your custom table name

$sql = "
    CREATE TABLE $table_name (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        PRIMARY KEY (id)
    );
";

require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
dbDelta( $sql );


// Register the REST API route
add_action('rest_api_init', function () {
    register_rest_route('myplugin/v1', '/submit-contact-form', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form_submission',
        'permission_callback' => '__return_true', // Allow public access
    ));
});

// Callback function to handle form submission
function handle_contact_form_submission($request) {
    $data = $request->get_json_params(); // Get JSON data sent from React

    // Sanitize and validate the incoming data
    $name = sanitize_text_field($data['name']);
    $email = sanitize_email($data['email']);
    $message = sanitize_textarea_field($data['message']);

    // Optionally validate the fields
    if (empty($name) || empty($email) || empty($message)) {
        return new WP_REST_Response(['success' => false, 'message' => 'All fields are required.'], 400);
    }

    // Insert the data into the custom table
    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_entries';

    $wpdb->insert(
        $table_name, // Table name
        [
            'name' => $name,
            'email' => $email,
            'message' => $message,
        ]
    );

    // Return a success response
    return new WP_REST_Response(['success' => true], 200);
}

// Handle CORS issues (if necessary)
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: http://localhost:5173'); // Change to your React app's origin
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
});
