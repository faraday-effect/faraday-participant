import {normalize, schema} from 'normalizr';

const topicData = [
    {
        "_id": "flask-templates",
        "title": "Flask/Jinja Templates",
        "intro": "<p>Templates provide a convenient way to create an HTML page. Flask’s\n<code>render_template</code> method takes the name of a template file and converts\nit to a string that you can return from a view function.</p>\n",
        "cells": [
            {
                "type": "listing",
                "_id": "flask-static-templates",
                "segments": [
                    {
                        "type": "cue-card",
                        "_id": "intro",
                        "title": "Static Templates",
                        "content": "<p>This route handler returns the contents of the template file <code>hello.html</code>.</p>\n"
                    },
                    {
                        "type": "code",
                        "_id": "view-function",
                        "meta": {
                            "language": "python",
                            "fileName": "app.py"
                        },
                        "content": "<pre><code class=\"python hljs\"><span class=\"hljs-meta\">@app.route('/')</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">def</span> <span class=\"hljs-title\">hello_world</span><span class=\"hljs-params\">()</span>:</span>\n    <span class=\"hljs-keyword\">return</span> render_template(<span class=\"hljs-string\">'hello.html'</span>)</code></pre>"
                    },
                    {
                        "type": "note",
                        "_id": "template",
                        "content": "<div=\"note\"><p>The <code>hello.html</code> file itself contains the following.</p>\n</div>"
                    },
                    {
                        "type": "code",
                        "_id": "template",
                        "meta": {
                            "language": "html",
                            "fileName": "templates/hello.html"
                        },
                        "content": "<pre><code class=\"html hljs\"><span class=\"hljs-meta\">&lt;!DOCTYPE html&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">html</span> <span class=\"hljs-attr\">lang</span>=<span class=\"hljs-string\">\"en\"</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">head</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">meta</span> <span class=\"hljs-attr\">charset</span>=<span class=\"hljs-string\">\"UTF-8\"</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">title</span>&gt;</span>Hello<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">title</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">head</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">body</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Hello, World<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>This is a Flask template.<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">body</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">html</span>&gt;</span></code></pre>"
                    }
                ]
            },
            {
                "type": "quiz",
                "_id": "python-bridge",
                "title": "The Python Bridge",
                "questions": [
                    {
                        "_id": "your-name",
                        "type": "short-answer",
                        "required": true,
                        "prompt": "What is your name?"
                    },
                    {
                        "_id": "your-quest",
                        "type": "multiple-choice",
                        "required": true,
                        "prompt": "What is your quest?",
                        "options": [
                            {
                                "value": "grail",
                                "text": "I seek the Holy Grail",
                                "correct": true
                            },
                            {
                                "value": "shrubbery",
                                "text": "I desire a shrubbery",
                                "correct": false
                            },
                            {
                                "value": "groceries",
                                "text": "I seek the grocery store",
                                "correct": false
                            }
                        ]
                    },
                    {
                        "_id": "your-favorite-color",
                        "type": "short-answer",
                        "required": false,
                        "prompt": "What is your favorite color?"
                    },
                    {
                        "_id": "bunny-preference",
                        "type": "multiple-choice",
                        "required": true,
                        "prompt": "Killer Bunny?",
                        "options": [
                            {
                                "value": "yes",
                                "text": "Yes, please",
                                "correct": true
                            },
                            {
                                "value": "no",
                                "text": "No, thank you",
                                "correct": false
                            }
                        ]
                    }
                ]
            },
            {
                "type": "listing",
                "_id": "flask-basic-templates",
                "segments": [
                    {
                        "type": "cue-card",
                        "_id": "intro",
                        "title": "Basic Templates",
                        "content": "<p>The previous example isn’t really a “template”; it doesn’t\nprovide any way to change the content of the page at run time.\nIt’s simply a static HTML file that’s rendered exactly as is.</p>\n<p>Templates are more useful when they include dynamically generated\ncontent from the Python view function. Consider the following template:</p>\n"
                    },
                    {
                        "type": "code",
                        "_id": "template",
                        "meta": {
                            "language": "html",
                            "fileName": "templates/hello-name.html"
                        },
                        "content": "<pre><code class=\"html hljs\"><span class=\"hljs-meta\">&lt;!DOCTYPE html&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">html</span> <span class=\"hljs-attr\">lang</span>=<span class=\"hljs-string\">\"en\"</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">head</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">meta</span> <span class=\"hljs-attr\">charset</span>=<span class=\"hljs-string\">\"UTF-8\"</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">title</span>&gt;</span>Hello<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">title</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">head</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">body</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Hello, {{ name }}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>This is a Flask template.<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">body</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">html</span>&gt;</span></code></pre>"
                    },
                    {
                        "type": "note",
                        "_id": "double-mustache",
                        "content": "<div=\"note\"><p>In the <code>h1</code> tag, note the <code>{{ name }}</code> syntax. The double curly braces\nenclose the name of a template variable whose value will be interpolated\ninto the HTML. That is, the entire sequence <code>{{ name }}</code> will be\nreplaced by the value of the <code>name</code> variable that is passed to the\ntemplate from the Python view function, as illustrated next.</p>\n</div>"
                    },
                    {
                        "type": "code",
                        "_id": "view-function",
                        "meta": {
                            "language": "python",
                            "fileName": "app.py"
                        },
                        "content": "<pre><code class=\"python hljs\"><span class=\"hljs-meta\">@app.route('/name')</span>\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">def</span> <span class=\"hljs-title\">hello_name</span><span class=\"hljs-params\">()</span>:</span>\n    <span class=\"hljs-keyword\">return</span> render_template(<span class=\"hljs-string\">'hello-name.html'</span>, name=<span class=\"hljs-string\">'Fred Ziffle'</span>)</code></pre>"
                    },
                    {
                        "type": "note",
                        "_id": "result",
                        "content": "<div=\"note\"><p>The <code>hello_name</code> view function renders the <code>hello-name.html</code> template and supplies\nthe string <code>'Fred Ziffle'</code> as the value of the <code>name</code> template variable.\nThe resulting <code>h1</code> element will be:</p>\n</div>"
                    },
                    {
                        "type": "code",
                        "_id": "result",
                        "meta": {
                            "language": "html"
                        },
                        "content": "<pre><code class=\"html hljs\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">h1</span>&gt;</span>Hello, Fred Ziffle<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">h1</span>&gt;</span></code></pre>"
                    }
                ]
            }
        ]
    }
];

const quizData = [
    {
        "title": "The Python Bridge",
        "_id": "python-bridge",
        "questions": [
            {
                "_id": "your-name",
                "type": "short-answer",
                "required": true,
                "prompt": "What is your name?"
            },
            {
                "_id": "your-quest",
                "type": "multiple-choice",
                "required": true,
                "prompt": "What is your quest?",
                "options": [
                    {
                        "value": "grail",
                        "text": "I seek the Holy Grail",
                        "correct": true
                    },
                    {
                        "value": "shrubbery",
                        "text": "I desire a shrubbery",
                        "correct": false
                    },
                    {
                        "value": "groceries",
                        "text": "I seek the grocery store",
                        "correct": false
                    }
                ]
            },
            {
                "_id": "your-favorite-color",
                "type": "short-answer",
                "required": false,
                "prompt": "What is your favorite color?"
            },
            {
                "_id": "bunny-preference",
                "type": "multiple-choice",
                "required": true,
                "prompt": "Killer Bunny?",
                "options": [
                    {
                        "value": "yes",
                        "text": "Yes, please",
                        "correct": true
                    },
                    {
                        "value": "no",
                        "text": "No, thank you",
                        "correct": false
                    }
                ]
            }
        ]
    },
    {
        "title": "JavaScript Promises",
        "_id": "js-promises",
        "questions": [
            {
                "_id": "promise-basic",
                "type": "multiple-choice",
                "required": true,
                "prompt": "Are promises part of ES2016?",
                "options": [
                    {
                        "value": "yes",
                        "text": "yes",
                        "correct": true
                    },
                    {
                        "value": "no",
                        "text": "No",
                        "correct": false
                    }
                ]
            }
        ]
    }
];

const listingData = [
    {
        "_id": "flask-static-templates",
        "segments": [
            {
                "type": "cue-card",
                "_id": "intro",
                "title": "Static Templates",
                "content": [
                    "This route handler returns the contents of the template file `hello.html`."
                ]
            },
            {
                "type": "code",
                "_id": "view-function",
                "meta": {
                    "language": "python",
                    "fileName": "app.py"
                },
                "content": [
                    "@app.route('/')",
                    "def hello_world():",
                    "    return render_template('hello.html')"
                ]
            },
            {
                "type": "note",
                "_id": "template",
                "content": [
                    "The `hello.html` file itself contains the following."
                ]
            },
            {
                "type": "code",
                "_id": "template",
                "meta": {
                    "language": "html",
                    "fileName": "templates/hello.html"
                },
                "content": [
                    "<!DOCTYPE html>",
                    "<html lang=\"en\">",
                    "<head>",
                    "    <meta charset=\"UTF-8\">",
                    "    <title>Hello</title>",
                    "</head>",
                    "<body>",
                    "    <h1>Hello, World</h1>",
                    "    <p>This is a Flask template.</p>",
                    "</body>",
                    "</html>"
                ]
            }
        ]
    },
    {
        "_id": "flask-basic-templates",
        "segments": [
            {
                "type": "cue-card",
                "_id": "intro",
                "title": "Basic Templates",
                "content": [
                    "The previous example isn’t really a \"template\"; it doesn't",
                    "provide any way to change the content of the page at run time.",
                    "It's simply a static HTML file that’s rendered exactly as is.",
                    "",
                    "Templates are more useful when they include dynamically generated",
                    "content from the Python view function. Consider the following template:"
                ]
            },
            {
                "type": "code",
                "_id": "template",
                "meta": {
                    "language": "html",
                    "fileName": "templates/hello-name.html"
                },
                "content": [
                    "<!DOCTYPE html>",
                    "<html lang=\"en\">",
                    "<head>",
                    "    <meta charset=\"UTF-8\">",
                    "    <title>Hello</title>",
                    "</head>",
                    "<body>",
                    "    <h1>Hello, {{ name }}</h1>",
                    "    <p>This is a Flask template.</p>",
                    "</body>",
                    "</html>"
                ]
            },
            {
                "type": "note",
                "_id": "double-mustache",
                "content": [
                    "In the `h1` tag, note the `{{ name }}` syntax. The double curly braces",
                    "enclose the name of a template variable whose value will be interpolated",
                    "into the HTML. That is, the entire sequence `{{ name }}` will be",
                    "replaced by the value of the `name` variable that is passed to the",
                    "template from the Python view function, as illustrated next."
                ]
            },
            {
                "type": "code",
                "_id": "view-function",
                "meta": {
                    "language": "python",
                    "fileName": "app.py"
                },
                "content": [
                    "@app.route('/name')",
                    "def hello_name():",
                    "    return render_template('hello-name.html', name='Fred Ziffle')"
                ]
            },
            {
                "type": "note",
                "_id": "result",
                "content": [
                    "The `hello_name` view function renders the `hello-name.html` template and supplies",
                    "the string `'Fred Ziffle'` as the value of the `name` template variable.",
                    "The resulting `h1` element will be:"
                ]
            },
            {
                "type": "code",
                "_id": "result",
                "meta": {
                    "language": "html"
                },
                "content": [
                    "<h1>Hello, Fred Ziffle</h1>"
                ]
            }
        ]
    }
];


function normalizeQuizzes(quizData) {
    const question = new schema.Entity('question', {}, {idAttribute: '_id'});
    const questions = new schema.Array(question);

    const quiz = new schema.Entity('quiz', {questions: questions}, {idAttribute: '_id'});
    const quizzes = new schema.Array(quiz);

    return normalize(quizData, quizzes);
}

function normalizeListings(listingData) {
    const segment = new schema.Entity('segment', {}, {idAttribute: '_id'});
    const segments = new schema.Array(segment);

    const listing = new schema.Entity('listing', {segments: segments}, {idAttribute: '_id'});
    const listings = new schema.Array(listing);

    return normalize(listingData, listings);
}

const makeSegmentId = (value, parent /*, key*/) => [parent._id, value.type, value._id].join('/');
const makeCellId = (value /*, parent, key*/) => [value.type, value._id].join('/');

function normalizeTopics(topicData) {
    const segment = new schema.Entity('segment', {}, {idAttribute: makeSegmentId});
    const segments = new schema.Array(segment);

    const cell = new schema.Entity('cell', {segments: segments}, {idAttribute: makeCellId});
    const cells = new schema.Array(cell);

    const topic = new schema.Entity('topic', {cells: cells}, {idAttribute: '_id'});
    const topics = new schema.Array(topic);

    return normalize(topicData, topics);
}

console.log(JSON.stringify(normalizeListings(listingData), null, 4));
console.log(JSON.stringify(normalizeQuizzes(quizData), null, 4));
console.log(JSON.stringify(normalizeTopics(topicData), null, 4));
