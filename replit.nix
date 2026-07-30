
{ pkgs }: {
  deps = [
    pkgs.glib
    pkgs.nspr
    pkgs.nss
    pkgs.dbus
    pkgs.atk
    pkgs.pango
    pkgs.gdk-pixbuf
    pkgs.gtk3
    pkgs.nodejs
    pkgs.nodePackages.npm
  ];
}
