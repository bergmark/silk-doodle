# Install & Run

You will need `node` and `npm` in your PATH.

```
make
node silkdoodle.js <site> <collection> <name> <email> <title>
```

* `<site>` is the Silk site you want to query
* `<collection>` is the collection on that site to fetch document titles from, these will be the selectable items in the Doodle.
* `<name>` is your name, for the Doodle form
* `<email>` your e-mail address, also for Doodle
* `<title>` the title of the Doodle

The output will be a complete Doodle wizard url, ready for submission.

## Example
```
node silkdoodle.js world.silkapp.com Country 'My Name' example@example.com 'Which country is the best?'
```
