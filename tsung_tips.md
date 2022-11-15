### Create an instance
_/bin/launch_tsung.sh_ :use this command to generate the ssh instance on which you will use to run tsung
* ssh into the IP in the script's output

### After SSH
* tsung_example.xml is a sample configuration file that establishes various connections to https://cs291.com
* create your own load file to test eb, an example is included in the OffTheRails repository.
* run load test: `tsung -f <<path to configuration file>> -k start
 * -k start opens a web interface to view statistics during and after the load test
 * to access web interface: http://<<ip of ssh>>:8091
* after testing, copy logs to local if necessary: `rsync -auvL <<ip of ssh>>:tsung_logs .`

