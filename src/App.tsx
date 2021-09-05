import React from 'react'
import {
    Alert,
    AppBar,
    Backdrop,
    Button,
    Collapse,
    Container,
    CssBaseline,
    ListItem,
    ListItemIcon,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { SAlert, SFile, SFileData } from './state'
import { BorderedBox } from './components/BorderedBox'
import { LevelParser } from './parser'
import Editor from '@monaco-editor/react'
import { Download, ExpandLess, ExpandMore } from '@material-ui/icons'

function download(filename: string, text: string) {
    const element = document.createElement('a')
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

function App() {
    const [drag, setDrag] = React.useState(false)
    const [alert, setAlert] = useRecoilState(SAlert)
    const [file, setFile] = useRecoilState(SFile)
    const [mapData, setMapData] = useRecoilState(SFileData)
    const editorRef = React.useRef<any>(null)
    const [editor, setEditor] = React.useState(false)

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            onDragOver={(e) => {
                e.preventDefault()
                setDrag(true)
            }}
            onDragLeave={() => {
                setDrag(false)
            }}
            onDrop={async (e) => {
                e.preventDefault()
                setDrag(false)
                const file = e.dataTransfer.files[0]
                if (!file.name.endsWith('.adofai')) {
                    setFile(null)
                    setMapData(null)
                    return setAlert('adofai 파일만 사용 가능합니다.')
                }

                setMapData(LevelParser(await file.text()))

                setFile(file)
            }}
        >
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">ADOFAI Editor Utils</Typography>
                </Toolbar>
            </AppBar>
            <Backdrop style={{ zIndex: 99999 }} open={drag}>
                <Typography color="#fff" fontSize={30} fontWeight={900}>
                    드래그해서 파일 선택하기
                </Typography>
            </Backdrop>
            <Toolbar />

            <Container
                component="main"
                style={{
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                {alert && <Alert severity={'error'}>{alert}</Alert>}
                {mapData ? (
                    <>
                        <BorderedBox>
                            <ListItem onClick={() => setEditor(!editor)} button>
                                <ListItemIcon>
                                    {editor ? <ExpandLess /> : <ExpandMore />}
                                </ListItemIcon>
                                맵 파일 에디터
                            </ListItem>
                            <Collapse in={editor}>
                                <div style={{ marginTop: 10 }}>
                                    <Editor
                                        height="500px"
                                        language="json"
                                        value={JSON.stringify(mapData, null, 4)}
                                        onMount={(editor) => {
                                            editorRef.current = editor
                                        }}
                                        onChange={(value) => {
                                            if (!value) return
                                            try {
                                                const data = JSON.parse(value)
                                                setMapData(data)
                                                setAlert(null)
                                            } catch (e: any) {
                                                setAlert(e.message)
                                            }
                                        }}
                                    />
                                </div>
                            </Collapse>
                        </BorderedBox>
                        <Button
                            startIcon={<Download />}
                            variant="outlined"
                            onClick={() => {
                                download(file!.name, JSON.stringify(mapData))
                            }}
                        >
                            다운로드
                        </Button>
                    </>
                ) : (
                    <label htmlFor="fileSelect">
                        <BorderedBox>
                            <input
                                id="fileSelect"
                                type="file"
                                style={{
                                    display: 'none',
                                }}
                                onChange={async (e) => {
                                    setAlert(null)
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    if (!file.name.endsWith('.adofai')) {
                                        setFile(null)
                                        setMapData(null)
                                        return setAlert(
                                            'adofai 파일만 사용 가능합니다.',
                                        )
                                    }

                                    setMapData(LevelParser(await file.text()))

                                    setFile(file)
                                }}
                            />
                            <Typography variant="h6">
                                맵 파일 드래그 또는 여기를 클릭해 파일을
                                선택해주세요
                            </Typography>
                        </BorderedBox>
                    </label>
                )}
            </Container>
        </div>
    )
}

export default App
