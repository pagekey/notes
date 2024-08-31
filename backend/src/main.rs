use std::process::Command;
use std::str;
use std::sync::Arc;

use serde::Serialize;

use pagekey_xylo::Route;
use pagekey_xylo::start;


#[derive(Serialize)]
struct SampleMessage {
    message: String,
    code: i32,
}


fn index() -> SampleMessage {
    // Execute the `ls` command and capture the output
    let output = Command::new("ls")
        .output()
        .expect("Failed to execute command");

    // Convert the output to a string
    let output_str = str::from_utf8(&output.stdout)
        .expect("Failed to convert output to string");

    // Return the output as a string
    SampleMessage {
        message: output_str.to_string(),
        code: 123,
    }
}
fn other() -> SampleMessage {
    SampleMessage {
        message: "Other route".to_string(),
        code: 123,
    }
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
