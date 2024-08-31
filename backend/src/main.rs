use pagekey_xylo::Route;
use pagekey_xylo::start;

fn greet() -> String {
    "Hello world from notes!".to_string()
}

fn main() {
    let route = Route {
        path: "/".to_string(),
        handler: greet,
    };
    start(route);
}
