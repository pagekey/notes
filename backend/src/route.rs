// placeholder

fn hello_route(name: &str) -> String {
    format!("Hello, {}", name)
}

pub const ROUTES: &[fn()] = &[hello_route];
