import urllib.request
import sys
from pathlib import Path

KERNELS = {
    "naif0012.tls": "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/lsk/naif0012.tls",
    "pck00011.tpc": "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc",
    "de440s.bsp": "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de440s.bsp",
    "moon_pa_de440_200625.bpc": "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/moon_pa_de440_200625.bpc",
    "moon_de440_250416.tf": "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/fk/satellites/moon_de440_250416.tf",
}

kernel_dir = Path(__file__).parent / "kernels"
kernel_dir.mkdir(exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0"}

for name, url in KERNELS.items():
    dest = kernel_dir / name
    if dest.exists() and dest.stat().st_size > 1000:
        print(f"Already exists: {name} ({dest.stat().st_size:,} bytes)")
        continue
    print(f"Downloading {name} from {url} ...")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=120) as resp, open(dest, "wb") as f:
        data = resp.read()
        f.write(data)
    print(f"Saved {name} ({dest.stat().st_size:,} bytes)")

print("All kernels downloaded successfully!")

