# Access Your Device Anywhere with SSH Reverse Tunneling

You may just bought a Raspberry Pi, and are so excited that
you would like to access it outside your home. However, you
meet a problem: your device is connected to your home network,
and its address is behind a NAT so you can't access it directly
with its IP. You may want to configure your home router and ask
it to route the traffic for you, it sometimes works, but if you
are unfortunately using some unconfigurable routers (such as 
the KCM3101 Modem I get from J:COM), you need to find another way.

Here's the solution I come up with: the SSH reverse tunneling.
Since my router barely blocks every inbound traffic. I can only
rely on my Raspberry Pi to search for outside help proactively.
The helper I've found is the Amazon Web Service (AWS). It is fairly
cheap and accessible. I can use it to create a tunnel between my
Raspberry Pi and my AWS server, and then I can access my Raspberry
Pi with any device that can connect to the AWS server. So let's do it!

## Step 1: Create an AWS EC2 Instance

First, you need to create an AWS account. Then you can create an
EC2 instance. For the EC2 instance type, the cheapest one is enough.
For most of the configuration options, you can just use the default
ones. Just notice the following few points:

### Location

Definitely, you don't want to lag a lot when you connect to your
Raspberry Pi. So choose a location that is close to you.

### Key Pair

![](https://i.imgur.com/jhuheMd.png)
You need to create a key pair for your EC2 instance. You'll need the
private key to connect to your instance later. If you already
have a key pair, you can use it directly.

### Network Settings

![](https://i.imgur.com/Mt4vbCh.png)
You need to configure the inbound security group rules to allow
the instance to be accessed from a port other than 22. 22 is the
port for SSH, and you need to use another port for the tunneling.
I use port 2222 in this example.

After you've created the instance, you can connect to it with the
private key you've downloaded.

## Step 2: Create the Reverse Tunnel

Before creating the reverse tunnel, you need to enable it in the
`sshd_config` file of your Raspberry Pi. Open the file with the
following command:

```bash
sudo vim /etc/ssh/sshd_config
```

Uncomment or add the following lines:

```
AllowTcpForwarding yes
GatewayPorts yes
```

Now we can create the reverse tunnel. From your Raspberry Pi, run
the following command:

```bash
ssh -i aws.pem -fN -R 2222:localhost:22 ec2-user@<your-ec2-public-ip>
```

Replace `aws.pem` with the path to your private key, and
`<your-ec2-public-ip>` with the public IP of your EC2 instance. With
this tunnel, the port 2222 of your EC2 instance is forwarded to the
port 22 of your Raspberry Pi.

A concern with pure `ssh` is that the tunnel will be closed when the
connection is lost. You can use
[`autossh`](https://github.com/Autossh/autossh) to keep the tunnel alive.
`autossh` itself is just a wrapper of `ssh`, and it will restart the
tunnel when it is closed. The command is pretty similar to the `ssh`
above:

```bash
autossh -M 0 -i aws.pem -fN -R 2222:localhost:22 ec2-user@<your-ec2-public-ip>
```

`-M 0` tells `autossh` not to use a monitoring port. This option is
necessary by `autossh` but not by `ssh`, so we need to add it here.

To prevent the SSH tunnel from freezing, you can further config the
`/etc/ssh/ssh_config` file on your Raspberry Pi:

```
TCPKeepAlive yes
ClientAliveInterval 60
ClientAliveCountMax 3
```

`TCPKeepAlive` will send packets to the server to keep the connection
alive. `ClientAliveInterval` is the interval between the packets, and
`ClientAliveCountMax` is the number of packets that can be missed before
the connection is considered dead and closed, in which case `autossh`
will restart the tunnel.

## Step 3: Access Your Raspberry Pi

Yeah! Now you can access your Raspberry Pi from any device that can connect
to your EC2 instance. You can use the following command to
connect to your Raspberry Pi:

```bash
ssh -p 2222 <your-raspberry-pi-user>@<your-ec2-public-ip>
```

If you see your Raspberry Pi's shell popping up, congratulations!
You've made it! 🎉

## Conclusion

With the help of AWS and SSH reverse tunneling, you can access your
device from anywhere. It is a good solution when you can't configure
your home router to allow inbound traffic. Try it out and enjoy the
convenience it brings to you!