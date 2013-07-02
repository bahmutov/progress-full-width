# progress-full-width

Simple progress bar at the bottom of the browser window. If multiple
bars are added, they are stacked. You can also add progress bar with
auto timers.

    bower install progress-bars

## Example

    <script src="components/progress-full-width/bar.js"></script>
    <script>
      var bar = progressFullWidth({
        height: 10 // pixels
      });
      bar.progress(75);
      var bar2 = progressFullWidth({
        id: 'bar2',
        color: '#00ff00',
        height: 10
      });
      bar2.progress(25);
    </script>

## Small print

Copyright &copy; 2013 Gleb Bahmutov

MIT License, do anything with the code, but don't blame me if it does not work.

