use std::sync::Arc;
use pagekey_xylo::Route;
use pagekey_xylo::start;

fn index() -> String {
    "Hello world from notes!!".to_string()
}
fn other() -> String {
    "Other route".to_string()
}

fn main() {
    let route1 = Route {
        path: "index".to_string(),
        handler: Arc::new(index),
    };
    let route2 = Route {
        path: "other".to_string(),
        handler: Arc::new(other),
    };
    let routes = vec![route1, route2];
    start(routes);
}
