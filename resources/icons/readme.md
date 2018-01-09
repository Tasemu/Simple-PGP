## Generate Icons

1. Drop a `logo.png` into this directory, also used for Linux.
2. Install dependencies:

~~~
npm install -g png2icns png-to-ico
~~~

3. Generate the `icns` file for Mac:

~~~
png2icns logo.png -s 16,32,64,128 -o logo.icns
~~~

4. Generate the `ico` file for Windows:

~~~
png-to-ico logo.png > logo.ico
~~~
