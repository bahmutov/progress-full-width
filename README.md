# progress-bars

Simple progress bar at the bottom of the browser window. If multiple
bars are added, they are stacked. You can also add progress bar with
auto timers.

    npm install progress-bars
    bower install progress-bars

## Example

    <!-- if installed with bower -->
    <script src="node_components/progress-bars/bar.js"></script>
    <!-- if installed with bower -->
    <script src="components/progress-full-width/bar.js"></script>
    <script>
      var bar = progressBars.init({
        height: 10 // pixels
      });
      bar.progress(75);
      var bar2 = progressBars.init({
        id: 'bar2',
        color: '#00ff00',
        height: 10
      });
      bar2.progress(25);
      var bar3 = progressBars.init();
      bar3.timer(60); // 1 minute
    </script>

## Small print

Copyright &copy; 2013 Gleb Bahmutov

MIT License, do anything with the code, but don't blame me if it does not work.

