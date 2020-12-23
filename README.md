# rsc-www
modern, mobile-friendly recreation of the
[runescape classic](https://classic.runescape.wiki/w/RuneScape_Classic)
website. built using [nextjs](https://nextjs.org/) and
[express](https://expressjs.com/).

## install

    # npm install -g @2003scape/rsc-www

## cli usage
rsc-www connects to
[rsc-data-server](https://github.com/2003scape/rsc-data-server) for database
saving/loading and interacting with the game worlds. it supports TCP with
TLS or IPC [domain sockets](https://en.wikipedia.org/wiki/Unix_domain_socket).

## license
Copyright (C) 2020 2003Scape Team

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see http://www.gnu.org/licenses/.
