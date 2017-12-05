mkdir monit


# collectd

docker run prom/collectd-exporter cat /etc/collectd/collectd.conf > collectd.conf

docker ps -a | grep collectd | awk '{print $1}' | xargs docker rm

-#LoadPlugin network
+LoadPlugin network
 #LoadPlugin nfs
 #LoadPlugin nginx
 ##LoadPlugin notify_desktop
+<Plugin network>
+    Server "127.0.0.1" "25826"
+</Plugin>

docker run \
  --network=host \
  --privileged \
  -v /proc:/mnt/proc:ro \
  -v $PWD/collectd.conf:/etc/collectd/collectd.conf \
  --name=collectd \
  fr3nd/collectd

docker run \
  --privileged \
  -v /proc:/mnt/proc:ro \
  -v $PWD/collectd.conf:/etc/collectd/collectd.conf:ro \
  -v $PWD/types.db:/usr/share/collectd/types.db:ro \
  --name=collectd \
  fr3nd/collectd


docker run \
  --network=host \
  --privileged \
  -v /proc:/mnt/proc:ro \
  -v $PWD/collectd.conf:/etc/collectd/collectd.conf \
  --name=collectd \
  prom/collectd-exporter

# influxdb

docker run --rm influxdb:1.0 influxd config > influxdb.conf

[[collectd]]
-  enabled = false
+  enabled = true
   bind-address = ":25826"
   database = "collectd"
   retention-policy = ""
   batch-size = 5000
   batch-pending = 10
   batch-timeout = "10s"
   read-buffer = 0
   typesdb = "/usr/share/collectd/types.db"

docker cp collectd:/usr/share/collectd/types.db .

docker run \
  -p 8083:8083 \
  -p 8086:8086 \
  --name=influxdb \
  --hostname=influxdb \
  -v $PWD/influxdb:/var/lib/influxdb \
  -v $PWD/influxdb.conf:/etc/influxdb/influxdb.conf:ro \
  -v $PWD/types.db:/usr/share/collectd/types.db:ro \
  influxdb


관리자 인터페이스는 docker run -P사용할 때 자동으로 노출되지 않으며 기본적으로 비활성화되어 있습니다. 관리자 인터페이스를 사용하려면 웹 브라우저가 컨테이너의 동일한 포트에서 InfluxDB에 액세스 할 수 있어야합니다. -P임의의 포트에서 HTTP 포트를 호스트에 노출 하므로 관리자 인터페이스는이 설정과 호환되지 않습니다.

관리자 인터페이스는 1.1.0에서 더 이상 사용되지 않으며 1.3.0에서 제거됩니다. 

8083 제거뎀.

# grafana

docker run \
  -d \
  -p 3000:3000 \
  --name=grafana \
  --link=influxdb \
  -e "GF_SERVER_ROOT_URL=http://127.0.0.1" \
  -e "GF_SECURITY_ADMIN_PASSWORD=secret" \
  -e "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource" \
  -v $PWD/grafana:/var/lib/grafana \
  grafana/grafana


docker run --name grafana \
  -p 3000:3000 \
  -v $PWD/grafana:/var/lib/grafana \
  --link influxdb \
  grafana/grafana:3.1.1




  sudo tcpdump -i lo -p -n dst port 25826


# telegraf

docker run --net=container:influxdb telegraf

docker run \
  -d \
  --privileged \
  --net=container:influxdb \
  -v $PWD/telegraf.conf:/etc/telegraf/telegraf.conf:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /sys:/rootfs/sys:ro \
  -v /proc:/rootfs/proc:ro \
  -v /etc:/rootfs/etc:ro \
  --name=telegraf \
  telegraf



docker run \
  -d \
  --privileged \
  --link=influxdb \
  -v $PWD/telegraf.conf:/etc/telegraf/telegraf.conf:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /sys:/rootfs/sys:ro \
  -v /proc:/rootfs/proc:ro \
  -v /etc:/rootfs/etc:ro \
  --name=telegraf \
  telegraf



curl -GET 'http://127.0.0.1:8086/query?pretty=true' --data-urlencode "q=CREATE DATABASE telegraf"