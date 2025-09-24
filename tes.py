import time
from pynput.keyboard import Controller, Key

# Controller untuk keyboard
keyboard = Controller()

# Sheets contoh (bisa diganti sesuai input kamu)
sheets = "[G7] [hQ] [rG] [zT] y T [kd5] 9 w [xrh] e [wk] [fL6] [z0] [eL] z [xfT] [rGC] e [pG9] e d [pfe*] 0 e G f [aG7] Q r T y d [TG] f [aG] 5 f [d9] f [wd] r w [G9] [aG] [jS] 6 [pG] 0 [pG] e [pf] T [pG] e [pf] 0 [pf] [ed] d [G2] [jd] 6 [jd] 9 [pG] Q [ph] G [pfe] 9 f [aG] 7 Q r T y [rG] f [aG] 5 f [d9] f [wd] r w 9 [pG6] j 0 [pj] e [pG] T [ph] e [pG] 0 [pf] e [pd] [pG] 2 [pj] 6 [pj] Q [pG] ! [ph] [G6] [pf0] e d 7 [kdQ] r [aTG] [ja] [yjd] [rfaQ] d 5 [kd9] e [raG] [jd] [wja] [wof9] 6 [kf0] e [TSG] [jfe] [jS0] [pfe0] d [dI2] [G6] [pf9] [QG] [jG] [jed] [pQG9] G 7 [kdQ] r [aTG] [ja] [yjd] [rfaQ] d 5 [kd9] e [raG] [jd] [wja] [wof9] 6 [kf0] e [TSG] [jfe] [jS0] [pfe0] d [dI2] [G6] [pfQ] [SG!] [jS6] [jf0] [peG0] G 7 [QG] [rfa] [TG] f [aG] [yG] [fa] r d 5 [aG9] [wf] [rfa] [ja] [wj] [fa9] 6 [G0] [pfe] [TG] f [pG] [G0] [pf] e d [pd9] [eG] [ypf] [IG] [ph] [yG] [pfe] G f [da7] [hQ] [rfa] [TG] f [aG] [yG] [fa] r d 5 [aG9] [fe] [raG] [ja] [wj] [fa9] 6 [G0] [pfe] [TG] [pG] [d0] [ped] f d [pd9] [eG] [yf] [pG*] [jS] [jfe] [pG0] G f [daG7] Q [yr] [rQ] 7 d [rQG] [fa] [daG] 5 f [d9] f [wrda] [w9] 5 [waG9] [aG] [jfS] 6 [SG] 0 [pSG] [eT] [pf] [e0] [pSG] [pf] 6 f [ped0] d [G2] [jd] 6 [jdG] [Q9] [pG] [96] h [pG] [pfI6] [up6] [pG6] f [daG7] Q [yr] [rQ] 7 [raQG] [fa] [daG] 5 f [d9] f [wrda] [w9] 5 [w9] [G6] [jS] 0 [pjS] [eT] [pG] [e0] [phS] [pSG] 6 [pf] [e0] [pd] [pdG] 2 [jd] 6 [jdG] [Q9] [pG] ! [phS] G [pfS6] [e0] d 7 [kdQG] [yr] [raQG] [jda] [jd7] [rfaQI] d 5 [kda9] [wr] [waG9] [jda] [ja5] [wofa9] 6 [kfS0] [eT] [eSG0] [jfS] [jS6] [pfeS0] d [pdI92] [G6] [pfQ9] [pSG*!] [pjS] [jd6] [peTSG] G 7 [kdQG] [yr] [raQG] [jda] [jd7] [rfaQI] d 5 [kda9] [wr] [waG9] [jda] [ja5] [wofa9] 6 [kfS0] [eT] [eSG0] [jfS] [jS6] [pfeS0] d [pdI92] [G6] [pfQ9] [pSG*!] [pjS] [jd6] [peTSG] G [rkdaQ] [jQ] [h9] [G7] [aG$] [f7] [d9] [fQ] [wrofa] [wG] 9 7 5 7 9 w [kfeS0] [j0] [h*] [G6] [SG3] [f6] [d*] [f0] [pdQG9] y [xfe] [jbQ] [vh9] [GC6] [xf9] [dQ] [rkdaQ] [jQ] [h9] [G7] [aG$] [f7] [d9] [fQ] [wrofa] [wG] 9 7 [GC5] [zd7] [xf9] [wd] [kfeS0] [j0] [SG*] 6 [SG3] [f6] [d*] [f0] [pfQI9] [pG] [up0*] [pf] d d f [daG7] Q [yr] [rQ] 7 [raQG] G [oaG5] [fa9] [wr] [wofa9] 5 [w9] f [pjS6] [G0] [peTG] [fe0] [pSG] [f6] [pfe0] d [pdI2] [pG6] [QG9] [pdI96] 6 G [upd6] [pG6] [daG7] Q [yr] [rdaQ] [j7] [rdaQG] [aG] f [oaG5] [fa9] [wr] [wofa9] 5 [w9] f [pjS6] [G0] [peTG] [fe0] [pSG] [f6] [pfe0] [pdI2] 6 [Q9] [upS!] 6 [e0] G f [rdaQG7] d G f [oaG] [w95] f d f d G G [pjS] [e60] G G f G f f d d [ypedG9] j j G h G f [upeT*] f f [rdaQG7] f G f [oaG] [w95] f d f d [peSG60] j j G h G f d [pdG] [ye9] j j G h G f d 7 [kdQG] [yr] [raQG] [jda] [jd7] [rfaQI] d 5 [kda9] [wr] [waG9] [jda] [ja5] [wofa9] 6 [kfS0] [eT] [eSG0] [jfS] [jS6] [pfeS0] d [pdI92] [G6] [pfQ9] [pSG96] [pjG] [jd6] [pSG6] [G6] 7 [kdQG] [yr] [raQG] [jda] [jd7] [rfaQI] d 5 [kda9] [wr] [waG9] [jda] [ja5] [wofa9] 6 [kfS0] [eT] [eSG0] [jfS] [jS6] [pfeS0] d [pdI92] [G6] [pfQ9] [pSG*!] [pjS] [jd6] [peSQG] G [rdaQG7] [dG] j h G f G [woaG95] [aG] j h G f G [peSG60] [SG] j h G f G [ypedG9] [dG] G G [peTSG*] G [rdaQG7] [dG] j h G f G [woaG95] [aG] j h G f G [peSG60] [SG] j h G f G [ypedG9] G [peTS*] [pG] f"

# Fungsi untuk menekan tombol
def press_keys(keys, delay=0.3):
    """Menekan satu atau beberapa tombol sekaligus"""
    if len(keys) > 1:
        # Tekan bersamaan
        for k in keys:
            keyboard.press(k)
        time.sleep(delay)
        for k in keys:
            keyboard.release(k)
    else:
        # Tekan satu tombol
        k = keys[0]
        keyboard.press(k)
        keyboard.release(k)
        time.sleep(delay)

# Parsing sheets
tokens = sheets.split()

for token in tokens:
    if token.startswith("[") and token.endswith("]"):
        # Buang kurung []
        combo = token[1:-1]
        # Misalnya "kd5" -> ['k','d','5']
        press_keys(list(combo))
    else:
        # Tekan tombol tunggal
        press_keys([token])