import { useState, useEffect } from 'react'
import {
    Drawer,
    Box,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import InfoButton from '../InfoButton'
import Blocks from './Blocks'
import Pages from './Pages'
import Templates from '../../templates/List'
import Settings from './Settings'
import Media from "./Media"
import constants from 'constant'
const { SIDEPANEL, SECTION, EVENTS } = constants
const { TITLE } = SIDEPANEL

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const SidePanel = ({ open, openCategory, onLeave, principal, project, editor}) => {
    const [delay, setDelay] = useState(false)

    useEffect(() => {
        document.addEventListener(EVENTS.CLOSE_DELAY, () => setDelay(true))
        return () => document.removeEventListener(EVENTS.CLOSE_DELAY, () => {})
      }, [])

    const onClose = () => {
        editor.AssetManager?.close()
        onLeave()
    }

    const dismiss = () => {            
        if (delay) {
            setTimeout(() => setDelay(false), 2000)
        } else {
            onClose()
        }
    }

    return (
        <Drawer
            anchor="left"
            onClose={onLeave}
            open={open}
            hideBackdrop={true}
            elevation={0}
            onMouseLeave={dismiss}
            PaperProps={{
                sx: {
                    width: openCategory === SECTION.TEMPLATE ? '45vw' : '35vw',
                    ml: '60px',
                    mt: '56px',
                    boxShadow: '15px 15px 15px 0px rgba(0,0,0,0.15)',
                    border: '1px solid #dfe5eb',
                    zIndex: 10
                }
            }}
        >
            <Grid container direction="column" >
                <Grid item>
                    <Stack
                        direction="row"
                        justifyContent="left"
                        alignItems="left"
                        spacing={1}
                        sx={{
                            borderTop: '5px solid #6366F1',
                        }}
                    >
                        <Box sx={{ minWidth: 120, m: '15px' }}>
                            <Typography variant="h4" color="black" fontWeight="bolder">
                                {TITLE[openCategory]}
                                <InfoButton section={openCategory} />
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item>
                    {openCategory === SECTION.BLOCKS && (<Blocks onLeave={onLeave} editor={editor} project={project} />)}
                    {openCategory === SECTION.PAGES && (<Pages onLeave={onLeave} editor={editor} project={project} />)}
                    {openCategory === SECTION.TEMPLATE && (<Templates onLeave={onLeave} editor={editor} project={project} />)}
                    {openCategory === SECTION.SETTINGS && (<Settings onLeave={onLeave} principal={principal} project={project} editor={editor} />)}
                    {openCategory === SECTION.MEDIA && (<Media onLeave={onLeave} editor={editor} project={project} />)}
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default SidePanel
