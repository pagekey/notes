// placeholder

// fn hello_route(name: &str) -> String {
//     format!("Hello, {}", name)
// }

// pub const ROUTES: &[fn()] = &[hello_route];

use pagekey_xylo::start;

fn greet() -> String {
    "Hello world from notes!".to_string()
}

fn main() {
    start(greet);
}
